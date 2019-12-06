const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, color) => {
    
    let page = message.guild.emojis.array().slice().map(x => `**${x.id}** = ${x.toString()}`);
    page = client.util.chunk(page, 10);
    let pages = 1;

    let embed = new RichEmbed()
    .setAuthor(`${message.guild.name} Emoji List`, client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setColor(color)
    .setFooter(`Page ${pages} of ${page.length} • © 2019 Kyanbasu`)
    .setTimestamp()
    .setDescription(`If you want use this guild emoji, copy the \`ID\` and follow the steps below:
▫ <a:EMOJI_NAME:EMOJI_ID> = \`for Animated emoji\`
▫ <:EMOJI_NAME:EMOJI_ID> = \`for regular emoji\`
▫ \`message.react('EMOJI_ID')\` = \`for react message\`

${page[pages-1].join('\n')}`)
    let m = await message.channel.send(embed);
  
    client.setInterval(() => {
        m.clearReactions()
    }, 60000);
    
    if (page.length < 2) return;
    await m.react(`552925816170872893`);
    await m.react(`552925815613030436`);

    const backwardsFilter = (reaction, user) => reaction.emoji.name === `lefter` && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === `righter` && user.id === message.author.id;

    const backwards = m.createReactionCollector(backwardsFilter, { time:60000 });
    const forwards = m.createReactionCollector(forwardsFilter, { time:60000 });

    forwards.on('collect', f => {
        f.remove(message.author.id);
        if (pages === page.length) return;
        pages++;
        embed.setDescription(`If you want use this guild emoji, copy the \`ID\` and follow the steps below:
▫ <a:EMOJI_NAME:EMOJI_ID> = \`for Animated emoji\`
▫ <:EMOJI_NAME:EMOJI_ID> = \`for regular emoji\`
▫ \`message.react('EMOJI_ID')\` = \`for react message\`

${page[pages-1].join('\n')}`)
        embed.setFooter(`Page ${pages} of ${page.length} • © 2019 Kyanbasu`)
        m.edit(embed);
    });

    backwards.on('collect', b => {
        b.remove(message.author.id);
        if (pages === 1) return;
        pages--;
        embed.setDescription(`If you want use this guild emoji, copy the \`ID\` and follow the steps below:
▫ <a:EMOJI_NAME:EMOJI_ID> = \`for Animated emoji\`
▫ <:EMOJI_NAME:EMOJI_ID> = \`for regular emoji\`
▫ \`message.react('EMOJI_ID')\` = \`for react message\`

${page[pages-1].join('\n')}`)
        embed.setFooter(`Page ${pages} of ${page.length} • © 2019 Kyanbasu`)
        m.edit(embed);
    });
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'emojis',
    description: 'Showing guild emoji list',
    usage: 'emojis'
}