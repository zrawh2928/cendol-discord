const { RichEmbed } = require("discord.js");
const SQL = require("sqlite3").verbose();

exports.run = async (client, msg, args, color) => {

    const database = new SQL.Database('./databases/Cendol.db');
    var db = await database;
    let arr = [];

    db.all(`SELECT BotID FROM waiting`, async function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
          let user = await client.fetchUser(rows[i].BotID);
          rows[i]["name"] = user.username;
          arr.push(rows[i]);
      }

      let embed = new RichEmbed()
      .setColor(color)
      .setTitle("Bot Invitation Queue List")
      .setDescription(arr.length > 0 ? arr.map((x, i) => `**${i+1}.** \`${x.BotID}\` = ${x.name}`).join('\n') : 'No Data');
      msg.channel.send(embed);
    });
}

exports.conf = {
    aliases: [],
    cooldowns: '7'
}

exports.help = {
    name: "queue",
    description: "See bot-invite queue list",
    usage: "queue"
}