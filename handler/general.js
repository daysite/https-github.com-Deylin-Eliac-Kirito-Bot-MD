import { config } from '../config.js';

export const menu = {
    name: 'menu',
    description: 'Menú de comandos'
};

export async function menu(sock, message, jid, userJid, args, isGroup) {
    const menuText = `
🐱 *${config.botName}* 🐱
*Versión:* ${config.version}

📁 *COMANDOS PRINCIPALES*

🤖 *General*
${config.prefix}menu - Ver este menú
${config.prefix}info - Información del bot
${config.prefix}owner - Contacto del owner
${config.prefix}ping - Velocidad del bot

🎨 *Multimedia*
${config.prefix}sticker - Crear sticker desde imagen

👥 *Grupos* ${isGroup ? '' : '(Solo grupos)'}
${config.prefix}grupos - Comandos de grupo

🔧 *Owner* ${config.owner.includes(userJid) ? '' : '(Solo owner)'}
${config.prefix}bc [texto] - Broadcast

_📧 Creado con ❤️ usando Baileys_
    `.trim();

    await sock.sendMessage(jid, { text: menuText });
}

export const ping = {
    name: 'ping',
    description: 'Ver velocidad del bot'
};

export async function ping(sock, message, jid, userJid, args, isGroup) {
    const start = Date.now();
    await sock.sendMessage(jid, { text: '🏓 Pong!' });
    const latency = Date.now() - start;
    
    await sock.sendMessage(jid, { 
        text: `🚀 *Latencia:* ${latency}ms` 
    });
}

export const info = {
    name: 'info',
    description: 'Información del bot'
};

export async function info(sock, message, jid, userJid, args, isGroup) {
    const infoText = `
🤖 *INFORMACIÓN DEL BOT*

🐱 *Nombre:* ${config.botName}
⚡ *Versión:* ${config.version}
🔧 *Prefix:* ${config.prefix}
📱 *Creador:* ${config.owner[0].split('@')[0]}

💻 *Librería:* Baileys
🔄 *Tipo:* Multi-funcional

📞 *Soporte:* Contacta al owner
    `.trim();

    await sock.sendMessage(jid, { text: infoText });
}
