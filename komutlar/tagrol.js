const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {
if(!message.member.roles.cache.has("776724178246172689") && !message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send('Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin!.');
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Bir kullanıcı etiketlemen gerekiyor!')
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.roles.add('776724178228740133')
      let embed = new Discord.MessageEmbed() 
  .setColor('BLACK')
  .setDescription(`**<@&776724178228740133> permi başarı ile verildi**`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
    return message.channel.send(embed).then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'tagrol',
  description: "Sunucuya kaydolmaya ne dersin ?",
} 