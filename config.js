export const config = {
    // Información básica del bot
    botName: "NekoBot-MD",
    owner: [
        "5210000000000@s.whatsapp.net"  // ⚠️ REEMPLAZA con tu número real
    ],
    sessionName: "session",
    prefix: ".",
    version: "1.0.0",
    
    // Configuración de APIs (para futuras funciones)
    apis: {
        neko: "https://nekos.life/api/v2",
        lolhuman: "https://api.lolhuman.xyz"
    },
    
    // Mensajes del bot
    messages: {
        welcome: "✨ ¡Hola! Soy {botname} 🤖\nEscribe {prefix}menu para ver mis funciones",
        ownerOnly: "❌ Este comando es solo para el propietario del bot",
        groupOnly: "❌ Este comando solo funciona en grupos",
        error: "⚠️ Ocurrió un error al procesar el comando"
    }
};
