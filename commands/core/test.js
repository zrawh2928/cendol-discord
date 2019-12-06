const SQL = require("sqlite3").verbose();

exports.run = async (client, msg, args) => {
  if (msg.guild.id !== "538385554572705793" || !msg.member.hasPermission("MANAGE_GUILD")) return;
  if (msg.channel.id !== "552403125768683520") return msg.reply("You can only use this command at <#552403125768683520>").then(msg => msg.delete(5000));
  
  // let's make some variabels
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database; 
  let bot = msg.mentions.members.first() || msg.guild.members.get(args[0]);
  
  // if if and if
  if (!bot.user.bot) {
    return msg.channel.send(`**${msg.author.username}**, that user is not a bot!`).then(msg => msg.delete(5000));
  }
  if (bot.roles.has('539773995055317022')) return msg.channel.send(`You can start test the bot now!`).then(msg => msg.delete(5000));
  
  // now give some magic dust here
  db.get(`SELECT * FROM waiting WHERE BotID = "${bot.id}"`, async function (err, rows) {
    if (rows) {
      let owner = await client.fetchUser(rows.OwnerID);
      let botsLog = client.channels.get('551993823862063104');
      
      bot.setNickname(`[ ${rows.BotPrefix} ] ${bot.user.username}`).then(() => {
        bot.addRole('539773995055317022');
      });
      botsLog.send(`**${bot.user.username}** is being tested by **${msg.author.tag}**\nOwner: **${owner.tag}**`);
      // create channel and overwrite the permssions
      msg.guild.createChannel(bot.user.username).then(c => {
        c.setParent('552504669117874177');
        c.replacePermissionOverwrites({
          overwrites: [
            {
              id: '538385554572705793',
              deny: ['READ_MESSAGES'],
            },
            {
              id: bot.user,
              allow: ['READ_MESSAGES'],
            },
            {
              id: msg.author,
              allow: ['READ_MESSAGES'],
            },
          ]
        });
        // output is only one line
        msg.channel.send(`You can start test **${bot.user.tag}** now on <#${c.id}>`);
      });
      
    } else {
      // if you ilegally invite the bot
      msg.channel.send(`Bot is not in the queue!`).then(msg => msg.delete(5000));
    }
    
  });
}

exports.conf = {
  aliases: []
}

exports.help = {
  name: "test"
}