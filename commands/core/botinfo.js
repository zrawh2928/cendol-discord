 const { RichEmbed } = require("discord.js");
const SQL = require("sqlite3").verbose();

this.run = async (client, msg, args, color) => {
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database;
  let bot = msg.mentions.members.first() || msg.guild.members.get(args[0]);
  
  if (!bot.user.bot) return msg.channel.send(`**${msg.author.username}**, that user is not a bot!`).then(msg => msg.delete(5000));

  db.get(`SELECT * FROM main WHERE BotID = "${bot.id}"`, async function (err, rows) {
    if (!rows) {
      msg.channel.send("Bot is not in the database.").then(msg => msg.delete(5000));
    } else {
      var bUser = await client.fetchUser(rows.BotID);
      var owner = await client.fetchUser(rows.OwnerID);

      let embed = new RichEmbed()
      .setAuthor(`Information of ${bUser.tag}`, msg.guild.iconURL)
      .setFooter(`Replying to: ${msg.author.tag}`, msg.author.avatarURL)
      .setTimestamp()
      .setColor(color)
      .setThumbnail(bUser.avatarURL)
      .addField(`<:KyaBots:539766935521460240> Username`, `• <@${bUser.id}> | **${bUser.tag}**`)
      .addField(`<:KyaOwner:539766935097966598> Developers`, `• <@${owner.id}> | **${owner.tag}**`, true)
      .addField(`:speech_balloon: Prefix`, `• Use \`${rows.BotPrefix}\``, true)
      msg.channel.send(embed);
    }
  });
}

this.conf = {
  aliases: []
}

this.help = {
  name: "botinfo"
}