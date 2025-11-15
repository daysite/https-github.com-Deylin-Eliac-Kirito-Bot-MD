import { startBot } from './lib/connection.js';

console.log(`
╔═══════════════════════════╗
║    🐱 NEKOBOT-MD 🐱     ║
║    Iniciando sistema...   ║
╚═══════════════════════════╝
`);

// Primero iniciar el bot, luego importar los handlers
startBot().then(() => {
    import('./handler/messageHandler.js');
});
