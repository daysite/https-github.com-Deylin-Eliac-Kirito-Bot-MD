import { startBot } from './lib/connection.js';
import './handler/messageHandler.js';   // ✅ Nueva
console.log(`
╔═══════════════════════════╗
║    🐱 NEKOBOT-MD 🐱     ║
║    Iniciando sistema...   ║
╚═══════════════════════════╝
`);

startBot();
