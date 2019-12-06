const { Collection } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = client => {
    client.commands = new Collection();
    client.aliases = new Collection();
    
    // searchin modules in commands folder
    for (const module of readdirSync("./commands")) {
        // now searching commands in each module folder
        for (const command of readdirSync(`./commands/${module}`).filter(x => x.endsWith('.js'))) {
            var cmd = require(`../commands/${module}/${command}`);
            cmd.help.category = module;
            client.commands.set(cmd.help.name.toLowerCase(), cmd);
            // loopin all aliases for every commands
            for (const alias of cmd.conf.aliases) {
                client.aliases.set(alias.toLowerCase(), cmd.help.name.toLowerCase());
            }
        }
    } 
};