const SQL = require("sqlite3").verbose();

this.run = async (client, msg, args) => {
  if (!msg.member.hasPermission("MANAGE_GUILD")) return;
  
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database;
  
  let bot = msg.mentions.members.first() || msg.guild.members.get(args[0]);
  let prefix = args[1];
  
  if (!bot) return;
  if (!bot.user.bot) return msg.channel.send(`**${msg.author.username}**, that user is not a bot!`).then(msg => msg.delete(5000));
  if (!prefix) return msg.channel.send('Please input the new prefix!').then(msg => msg.delete(5000));
  
  db.get(`SELECT * FROM main WHERE BotID = "${bot.id}"`, async function (err, rows) {
    if (rows) {
      let botsLog = client.channels.get('551993823862063104');
      
      if (rows.BotPrefix == prefix) return msg.channel.send(`The prefix for <@${bot.id}> that you entered is same as before [ **${rows.botPrefix}** ]`).then(msg => msg.delete(5000));
      
      db.run(`UPDATE main SET BotPrefix = "${prefix}" WHERE BotID = "${bot.id}"`);
      msg.channel.send(`The prefix for <@${bot.id}> was successfully changed!`).then(msg => {
        msg.delete(5000);
        bot.setNickname(`[ ${prefix} ] ${bot.user.username}`);
        botsLog.send(`<@${bot.id}> **Prefix** was change from \`${rows.BotPrefix}\` to \`${prefix}\``);
      });
    } else {
      return msg.channel.send('Bot is not in Database');
    }
  });
}

this.conf = {
  aliases: []
}

this.help = {
  name: "botprefix"
}