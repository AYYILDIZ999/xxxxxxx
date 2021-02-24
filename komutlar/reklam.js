const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {

message.delete()
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<@${message.author.id}> **Bu komutu kullanabilmek için gerekli yetkin yok!**`);

message.delete()  
if (!args[0]) return message.channel.send(`**Lütfen \`aç\` yada \`kapat\` yazınız**`);

message.delete()  
if(args[0] == 'aç') {
var durum = await db.fetch(`reklam_${message.guild.id}`)             
if(durum == "acik") return message.channel.send(`<@${message.author.id}> **Reklam engelleme sistemi zaten açık!**`);
 db.set(`reklam_${message.guild.id}`, 'acik')
message.channel.send(` **Reklam koruması aktif 3 reklam yapan banlanıcak kardeşim**`);
}
message.delete()  
if(args[0] == 'kapat') {
var durum = await db.fetch(`reklam_${message.guild.id}`)           
if(durum == "kapali") return message.channel.send(`<@${message.author.id}> **Reklam engelleme sistemi zaten kapalı!**`);
db.set(`reklam_${message.guild.id}`, 'kapali')
message.channel.send(`**Reklam engelleme sistemini kapattım artık reklam yapabilecekler.**`);
}
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 3
};
exports.help = {
name: 'reklam-engel',
description: 'Sunucuda reklamları engellemeye yarayan sistemi aktif hale getirir.',
usage: '!reklam-engel'
};