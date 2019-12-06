const CendolClient = require("./structures/CendolClient");

const client = new CendolClient({
    fetchAllMembers: true,
    disableEvents: [
        "GUILD_SYNC",
        "PRESENCE_UPDATE",
        "TYPING_START"
    ]
});

require("./server.js");
require("./structures/EventsHandler")(client);
require("./structures/ModulesHandler")(client);

client.login(process.env.TOKEN);