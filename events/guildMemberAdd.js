const SQL = require("sqlite3").verbose();

module.exports = async (client, member) => {
  const database = new SQL.Database("./databases/Cendol.db");
  var db = await database;
  
  switch (member.guild.id) {
    case '550136791110516747': {
      if (member.user.bot) {
        // adding some magic word
        db.get(`SELECT * FROM main WHERE BotID = "${member.id}"`, async function (err, rows) {
          if (rows) {
            let owner = await member.guild.members.get(rows.OwnerID);
            let botsLog = client.channels.get('551993823862063104');
            let devRole = member.guild.roles.find(x => x.name == "Developers");
            
            member.setNickname(`[ ${rows.BotPrefix} ] ${member.user.username}`);
            botsLog.send(`<@${member.id}> has been added to the server!`);
            if (!owner.roles.some(role => role.name == devRole.name)) {
              return owner.addRole(devRole.id);
            } else return;
          }
        });
      }
      break;
    }
    
    case '538385554572705793': {
      if (member.user.bot) {
        db.get(`SELECT * FROM waiting WHERE BotID = "${member.id}"`, async function (err, rows) {
          if (rows) {
            let owner = await client.fetchUser(rows.OwnerID);
            let botsLog = client.channels.get('551993823862063104');
            
            member.addRole('552487037236805632')
            botsLog.send(`<:addMember:539767276350472212> | **${member.user.username}** has been added to **${member.guild.name}** to be tested\nOwner: **${owner.tag}**`)
          }
        }); 
      }
      break;
    }
  }
}