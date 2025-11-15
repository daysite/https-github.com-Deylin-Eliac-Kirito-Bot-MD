import { sock } from '../lib/connection.js';
import { commandHandler } from '../handler/commandHandler.js';
import { config } from '../config.js';

sock.ev.on('messages.upsert', async ({ messages }) => {
    const message = messages[0];
    if (!message.message || message.key.fromMe) return;

    const jid = message.key.remoteJid;  // ✅ CORREGIR: remoteJid (no removeJid)
    const isGroup = jid.endsWith('@g.us');  // ✅ CORREGIR: endsWith (no endswith)
    const userJid = message.key.participant || jid;
    
    // Obtener texto del mensaje
    const msgType = Object.keys(message.message)[0];
    let text = '';
    
    if (msgType === 'conversation') {
        text = message.message.conversation;
    } else if (msgType === 'extendedTextMessage') {
        text = message.message.extendedTextMessage.text;
    } else if (msgType === 'imageMessage') {
        text = message.message.imageMessage.caption || '';
    }

    // Verificar prefijo
    const isCmd = text.startsWith(config.prefix);
    const command = isCmd ? text.slice(config.prefix.length).trim().split(' ')[0].toLowerCase() : '';
    const args = isCmd ? text.slice(config.prefix.length + command.length).trim().split(' ') : [];

    // Manejar comandos
    if (isCmd) {
        await commandHandler(sock, message, jid, userJid, command, args, isGroup);
    }

    // Mensaje de bienvenida automático
    if (text.toLowerCase() === 'hola' && !isGroup) {
        await sock.sendMessage(jid, { 
            text: config.messages.welcome
                .replace('{botname}', config.botName)
                .replace('{prefix}', config.prefix)
        });
    }
});
