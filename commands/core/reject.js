const { RichEmbed } = require("discord.js");
const SQL = require("sqlite3").verbose();

this.run = async (client, msg, args, color) => {
  if (msg.guild.id !== "538385554572705793" || !msg.member.hasPermission("MANAGE_GUILD")) return;
  
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database; 
  let bot = msg.mentions.members.first() || msg.guild.members.get(args[0]);
  if (!bot) return;
  let channel = client.channels.find(x => x.name === bot.user.username.replace(/\W/g, '-').toLowerCase());
  let reason = args.join(" ").slice(22);
  
  // if if and if
  if (msg.channel.id !== channel.id) return msg.reply(`You can only use this command at <#${channel.id}>`).then(msg => msg.delete(5000));
  if (!bot.user.bot) return msg.channel.send(`**${msg.author.username}**, that user is not a bot!`).then(msg => msg.delete(5000));
  
  db.get(`SELECT * FROM waiting WHERE BotID = "${bot.id}"`, async function (err, rows) {
    if (rows) {
      let owner = await client.fetchUser(rows.OwnerID);
      let botsLog = client.channels.get('551993823862063104');
      let invChan = client.channels.get('557014701997948948');
      
      invChan.fetchMessage(rows.MessageID).then((msg) => {
        msg.react('539793045646737428');
        botsLog.send(`<:reject:539793045646737428> | **${bot.user.username}** has been rejected, please check your DM for reason\nOwner: <@${owner.id}>`);
        owner.send(`**${bot.user.username}** has been rejected ${reason ? `with reason: ${reason}` : ``}`);
        
        db.run(`DELETE FROM waiting WHERE BotID = "${bot.id}"`);
      });
      msg.channel.delete();
    } else {
      msg.channel.send(`Bot is not in the queue!`).then(msg => msg.delete(5000));
    }
  });
  bot.removeRole('539773995055317022');
  msg.guild.member(bot).kick();
}

this.conf = {
  aliases: []
}

this.help = {
  name: 'reject'
}