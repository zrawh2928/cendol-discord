const { Collection } = require("discord.js");
const cooldowns = new Collection();

module.exports = async (client, msg) => {
    if (msg.author.bot || !msg.guild) return;

    let prefix = client.config.PREFIX;
    let color = client.config.EMBED_COLOR;
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if (msg.channel.id === "557014701997948948") return require("../utils/BotInvite")(client, msg);
    if (!msg.content.startsWith(prefix.toLowerCase())) return undefined;

    let cmdFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmdFile) return undefined;
    if (cmdFile.conf.owner && !client.config.OWNERS_ID.includes(msg.author.id)) return;
    if (!cooldowns.has(cmdFile.help.name)) cooldowns.set(cmdFile.help.name, new Collection());

    var member = msg.member;
    var now = Date.now();
    var timeStamps = cooldowns.get(cmdFile.help.name) || new Collection();
    var cooldown = cmdFile.conf.cooldown || 5;
    var userCooldown = timeStamps.get(msg.author.id) || 0;
    var estimated = userCooldown + (cooldown * 1000) - now;

    if (userCooldown && estimated > 0) {
        return msg.channel.send(`${member.user.username}-san you must wait **${(estimated/1000).toFixed()}s** again before using the same command!`).then(msg => msg.delete(5000));
    }

    timeStamps.set(msg.author.id, now);
    cooldowns.set(cmdFile.help.name, timeStamps);
    cmdFile.run(client, msg, args, color);
}