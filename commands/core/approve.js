const { RichEmbed } = require("discord.js");
const SQL = require("sqlite3").verbose();

this.run = async (client, msg, args, color) => {
  if (msg.guild.id !== "538385554572705793" || !msg.member.hasPermission("MANAGE_GUILD")) return;
  
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database; 
  let bot = msg.mentions.members.first() || msg.guild.members.get(args[0]);
  if (!bot) return;
  let channel = client.channels.find(x => x.name === bot.user.username.replace(/\W/g, '-').toLowerCase());
  
  // if if and if        <#${channel.id}>
   if (msg.channel.id !== channel.id) return msg.reply(`You can only use this command at <#${channel.id}>`).then(msg => msg.delete(5000));
  if (!bot.user.bot) return msg.channel.send(`**${msg.author.username}**, that user is not a bot!`).then(msg => msg.delete(5000));
  
  // now with magic dust9
  db.run("CREATE TABLE IF NOT EXISTS main (BotID TEXT, OwnerID TEXT, BotPrefix TEXT)");
  db.get(`INSERT INTO main SELECT BotID, OwnerID, BotPrefix FROM waiting WHERE BotID = "${bot.id}"`);
  db.get(`SELECT * FROM waiting WHERE BotID = "${bot.id}"`, async function (err, rows) {
    if (rows) {
      let owner = await client.fetchUser(rows.OwnerID);
      let botsLog = client.channels.get('551993823862063104');
      let invChan = client.channels.get('557014701997948948');
      
      invChan.fetchMessage(rows.MessageID).then((msg) => {
        msg.react('539778364966305813'); // verified emoji
        botsLog.send(`<:verified:539778364966305813> | **${bot.user.username}** has been accepted\nOwner: <@${owner.id}>`);
       // owner.send(`Your bot <@${bot.id}> has been approved! :tada:`)
      });
      let embed = new RichEmbed()
      .setColor(color)
      .setDescription(`Bot has been approved and insert into database, use this link for invite the bot to main server\nhttps://discordapp.com/oauth2/authorize?guild_id=550136791110516747&client_id=${bot.user.id}&permissions=0&scope=bot`)
      // client.channels.get('553002060640157770').send(embed);
      client.channels.get('553109907306577923').send(embed);
      msg.channel.delete();
      
      // delete data from database
      db.run(`DELETE FROM waiting WHERE BotID = "${bot.id}"`);
    } else {
      // if you ilegally invite the bot
      msg.channel.send(`Bot is not in the queue!`).then(msg => msg.delete(5000));
    }
  });
  bot.removeRole('539773995055317022');
  bot.removeRole('552487037236805632');
  // msg.guild.member(bot).kick();
}

this.conf = {
  aliases: []
}

this.help = {
  name: 'approve'
}