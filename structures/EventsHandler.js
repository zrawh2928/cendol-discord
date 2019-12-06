const { readdirSync } = require("fs");

module.exports = client => {
    for (const event of readdirSync("./events")) {
        client.on(event.split(".")[0], (...args) => require(`../events/${event}`)(client, ...args));
    }
}