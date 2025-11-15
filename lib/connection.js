import { makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import { config } from '../config.js';

export let sock = null;

export async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    sock = makeWASocket({
        version: [2, 2413, 1],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
        },
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: Browsers.ubuntu('Chrome'),
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('╔═══════════════════════════╗');
            console.log('║    ESCANEA EL CÓDIGO QR   ║');
            console.log('╚═══════════════════════════╝');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('⏳ Reconectando...');
            if (shouldReconnect) {
                setTimeout(startBot, 5000);
            }
        } else if (connection === 'open') {
            console.log('✅ Conexión exitosa con WhatsApp');
            console.log(`🤖 ${config.botName} está listo!`);
        }
    });

    sock.ev.on('creds.update', saveCreds);
    
    return sock;
}
