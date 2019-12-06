const { RichEmbed } = require("discord.js");
// const config = require("./config");

exports.run = async (client, message, args, color) => {
    let prefix = client.config.PREFIX;

    if (!args[0]) {
        let page = [`** Utility Commands.**
        
        • \`botinfo\`
        • \`help\`
        • \`ping\`
        • \`queue\``,
        `**Staff Commands.**
        
        • \`approve\`
        • \`botprefix\`
        • \`forceclaim\`
        • \`reject\`
        • \`test\``]
        let pages = 1;

        let embed = new RichEmbed()
        .setAuthor(`${client.user.username} Commands List`, client.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .setColor(color)
        .setFooter(`Page ${pages} of ${page.length} | © 2019 Garuda Development`)
        .setTimestamp()
        .setDescription(page[pages-1])
        let m = await message.channel.send(embed);

        // delete reaction after some interval
        client.setInterval(() => {
            m.clearReactions()
        }, 60000);
    
        // if page length less than 1 the reaction will not show up
        if (page.length < 2) return;

        await m.react(`552925816170872893`);
        await m.react(`552925815613030436`);

        const backwardsFilter = (reaction, user) => reaction.emoji.name === `lefter` && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === `righter` && user.id === message.author.id;
        const backwards = m.createReactionCollector(backwardsFilter, { time: 60000 });
        const forwards = m.createReactionCollector(forwardsFilter, { time: 60000 });

        backwards.on('collect', b => {
            b.remove(message.author.id);
            if (pages == 1) return;
            pages--;
            embed.setDescription(page[pages-1])
            embed.setFooter(`Page ${pages} of ${page.length} | © 2019 Garuda Development`)
            m.edit(embed);
        });

        forwards.on('collect', f => {
            f.remove(message.author.id);
            if (pages == page.length) return;
            pages++;
            embed.setDescription(page[pages-1])
            embed.setFooter(`Page ${pages} of ${page.length} | © 2019 Garuda Development`)
            m.edit(embed);
        });
    } else {
        let cmd = args[0];
        
        if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (command.conf.owner) return;

            let name = prefix + command.help.name;
            let desc = command.help.description;
            let aliases = command.conf.aliases;
            let usage = command.help.usage;

            let embed = new RichEmbed()
            .setAuthor(`${client.user.username} Help Description`, client.user.avatarURL)
            .setTitle(aliases[0] ? `${name} ❱ ${prefix}${aliases.join(` ❱ ${prefix}`)}` : name)
            .setThumbnail(message.guild.iconURL)
            .setDescription(desc)
            .setColor(color)
            .setFooter(`\`<>\` = required, \`[]\` = Optional`, message.author.avatarURL)
            .addField('Usage', `${prefix}${usage}`);
            return message.channel.send(embed);
        } else
        if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
            message.channel.send(`**${message.author.username}**, Maaf aku tidak bisa mencari perintah \`${cmd}\` yang kamu maksud.`);
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "help"
}