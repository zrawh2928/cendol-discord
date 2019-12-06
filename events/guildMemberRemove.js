const SQL = require("sqlite3").verbose();

module.exports = async (client, member) => {
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database;
  
  switch(member.guild.id) {
      
    case '550136791110516747': {
      if (member.user.bot) {
        db.get(`SELECT * FROM main WHERE BotID = "${member.id}"`, async function (err, rows) {
          if (rows) {
            db.run(`DELETE FROM main WHERE BotID = "${member.id}"`);
          }
        });
      } else {
        db.get(`SELECT * FROM main WHERE OwnerID = "${member.id}"`, async function (err, rows) {
          if (rows) {
            let bot = await client.fetchUser(rows.BotID);
            let botsLog = client.channels.get('551993823862063104');
            
            botsLog.send(`<:remMember:539767276426231818> | <@${bot.id}> has been kicked because the owner is leave from server.`)
            db.run(`DELETE FROM main WHERE OwnerID = "${member.id}"`);
            member.guild.member(bot).kick();
          }
        });
      }
      break;
    }
      
  }
}