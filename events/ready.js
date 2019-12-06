module.exports = client => {

    // client ready log
    console.log(`${client.user.username} Preparing to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds...`);
    
    // presence status
    client.setInterval(() => {
        const status = [`with ${client.users.size.toLocaleString()} users`, `in ${client.channels.size.toLocaleString()} channels`, 'at Garuda Development'];
        let rand = client.util.getRandInt(status.length);
        client.user.setActivity(status[rand], { type: "PLAYING" });
    }, 10000);

    // client success online
    console.log(`${client.user.username} Success boting and online!`);
}