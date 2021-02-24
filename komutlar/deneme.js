exports.run = async (client, msg, args) => {
  const author = msg.guild.member(msg.author);
  const uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
  const kanal = "776724179503939605";
  if (!author.roles.cache.get("777849274352009236") && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  await uye.roles.add(["776724178246172689", "776724178266882050", "778628308790280192"]).catch();
  await msg.channel.send({embed:{timestamp:new Date(),description:`<a:Guardians:777460993310851082> **${uye} Adlı Kullanıcısına Deneme yetkisi verdim!** \n <a:Guardians:777460993310851082> **Verdiğim Roller**: \ <@&776724178246172689> <@&776724178266882050> <@&778628308790280192>`, footer: { text: "Komutu kullanan: " + msg.author.username}, color: Math.floor(Math.random() * (0xFFFFFF+1))}}).catch();
  msg.guild.channels.cache.get(kanal).send(`<a:Guardians:777460993310851082> **${uye} Yeni Yetkilimiz Aramıza Katıldı !** <@&776724178246172689> Herkes Hoşgeldin desin <a:kalp3:777352089793855518> `);
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['terfi'],
    permLevel: 0
};
exports.help = {
  name: 'deneme'
};