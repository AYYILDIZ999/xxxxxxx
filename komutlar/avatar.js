const Discord = require('discord.js');
const ms = require('ms');
exports.run = async(client, message, args) => {
	let victim = message.mentions.users.first() || (args.length > 0 ? client.users.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	const embed = new Discord.MessageEmbed()
    .setFooter(`${message.author.username}`,`${message.author.avatarURL({dynamic: true})}`)
    .setImage(victim.avatarURL({dynamic: true}))
    .setTimestamp()
	message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['avtr'],
  permLevel: 0
};

exports.help = { 
  name: 'avatar', 
  description: 'Avatar gösteriyor falan',
  usage: 'avatar @üye/id/isim',
  kategori: 'kullanıcı'
};