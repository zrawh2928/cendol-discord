'use strict';
const { RichEmbed } = require("discord.js");
const SQL = require("sqlite3").verbose();

module.exports = async (client, msg) => {
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database;
  msg.delete();

  let BotID = msg.content.split(" ").splice(0)[0];
  let BotPrefix = msg.content.split(" ").splice(1).join(" ");
  let OwnerID = msg.author.id;
  
  if (isNaN(BotID)) return msg.channel.send('Please only input number for the ID').then(msg => msg.delete(5000));
  if (!BotPrefix) return msg.channel.send("Why you didn't input the prefix?\nUsage: **<BotID> <BotPrefix>**").then(msg => msg.delete(5000));

  db.run("CREATE TABLE IF NOT EXISTS waiting (BotID TEXT, OwnerID TEXT, BotPrefix TEXT, MessageID TEXT)");
  db.get(`SELECT * FROM waiting WHERE BotID = '${BotID}'`, async function (err, rows) {
    if (err) {
      if (err.message == "SQLITE_ERROR: no such table: waiting") return undefined;
      console.error(err.message);
    }
    if (!rows) {
      // console.log(BotID)
      if (BotID != null) {
        client.fetchUser(BotID).then(bot => {
          if (!bot.bot) return msg.channel.send("The ID you entered does not belong to a bot user").then(msg => msg.delete(5000));
          if (msg.guild.members.get(bot.id)) return msg.channel.send(`The Bot ID that you sent already exists on this server\nThe ID belongs: <@${bot.id}>`).then(msg => msg.delete(5000));

          // embed
          let link = `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0`;
          let botsLog = client.channels.get('551993823862063104');
          let waitLog = client.channels.get('551993725765681152');

          let embed = new RichEmbed()
          .setAuthor(`${msg.author.tag} Bots`, msg.author.avatarURL)
          .setThumbnail(bot.avatarURL)
          .setColor(client.config.EMBED_COLOR)
          .setDescription(`Thanks for [inviting](${link}) your bot! It will be tested and added to the guild shortly.`)
          .addField("Bot Name", bot.username, true)
          .addField("Bot ID", BotID, true)
          .addField("Owner", `<@${OwnerID}>\n(${msg.author.tag})`, true)
          .addField("Bot Prefix", `Use: \`${BotPrefix}\``, true);
          msg.channel.send(embed).then(m => {
              db.run("INSERT INTO waiting (BotID, OwnerID, BotPrefix, MessageID) VALUES (?, ?, ?, ?)", [BotID, OwnerID, BotPrefix, m.id]);
          });

          // send and send
          waitLog.send(embed);
          botsLog.send(`<:plus:552485483763073054> | **${bot.username}** has been added to the queue.\nOwner: **${msg.author.tag}**`);
        }).catch(e => {
          if (e.message === "Unknown User") return msg.channel.send("ID not valid. Please check the ID and input again.").then(msg => msg.delete(5000));
          console.error();
        });
      }

    } else {
      return msg.channel.send("Please be patient, The ID that you entered is already in the queue.").then(msg => msg.delete(5000));
    }
  });
}