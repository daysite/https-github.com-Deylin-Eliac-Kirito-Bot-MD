import { startBot } from './lib/connection.js';
import './handlers/messageHandler.js'; // ✅ AGREGAR esta línea

console.log(`
╔═══════════════════════════╗
║    🐱 NEKOBOT-MD 🐱     ║
║    Iniciando sistema...   ║
╚═══════════════════════════╝
`);

startBot();
