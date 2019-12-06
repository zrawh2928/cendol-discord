exports.run = async (client, message, args) => {
    let start = Date.now(); message.channel.send("Ara ara,").then(msg => {
        msg.delete();
        let diff = (Date.now() - start).toLocaleString();
        message.channel.send(`Cendole, time taken: **${diff}ms**`);
    });
}

exports.conf = {
    aliases: ['pong', 'peng'],
    cooldowns: '3'
}

exports.help = {
    name: "ping",
    description: "check bot latency",
    usage: "ping"
}