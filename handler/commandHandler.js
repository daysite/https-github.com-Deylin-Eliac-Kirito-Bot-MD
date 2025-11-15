import { config } from '../config.js';
import * as generalCmds from '../commands/general.js';

const commands = {
    ...generalCmds
};

export async function commandHandler(sock, message, jid, userJid, command, args, isGroup) {
    try {
        const cmdFunction = commands[command];
        
        if (!cmdFunction) {
            return await sock.sendMessage(jid, { 
                text: `❌ Comando no encontrado. Usa *${config.prefix}menu* para ver la lista de comandos.` 
            });
        }

        // Verificar permisos
        if (cmdFunction.ownerOnly && !config.owner.includes(userJid)) {
            return await sock.sendMessage(jid, { text: config.messages.ownerOnly });
        }

        if (cmdFunction.groupOnly && !isGroup) {
            return await sock.sendMessage(jid, { text: config.messages.groupOnly });
        }

        // Ejecutar comando
        await cmdFunction(sock, message, jid, userJid, args, isGroup);

    } catch (error) {
        console.error('Error en comando:', error);
        await sock.sendMessage(jid, { text: config.messages.error });
    }
}
