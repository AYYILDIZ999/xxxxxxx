const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
const moment = require("moment");
let tarih = moment(
  Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul" }))
).format("MM/DD HH:mm:ss");


const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
client.appInfo = await client.fetchApplication();
setInterval( async () => {
client.appInfo = await client.fetchApplication();
}, 600);
client.user.setActivity('♱ Guardians', { url: 'https://www.twitch.tv/', type: 'STREAMING' });
console.log("v12 Deneme")});

const log = message => {
console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`Yüklenen komut: ${props.help.name}.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});});});




client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();} catch (e) {
reject(e);}
});};

client.load = command => {
return new Promise((resolve, reject) => {
try {
let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();} catch (e) {
reject(e);
}});};

client.unload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
resolve();
} catch (e) {
reject(e);
}});};


client.elevation = message => {
if (!message.guild) {
return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyarı_${message.guild.id}`);
  let reklamkick = await db.fetch(`reklam_${message.guild.id}`)
  let kullanici = message.member;
  let jail = "776724178236997655";
  if (reklamkick == 'kapali') return;
  if (reklamkick == 'acik') {
      const reklam = ["discord.app", "discord.gg","discordapp", "discordgg", ".com", ".net", ".xyz", "https://", "http://","https//","http//",];
      if (reklam.some(word => message.content.toLowerCase().includes(word))) {
          if (!message.member.hasPermission("ADMINISTRATOR")) {
              message.delete();
              db.add(`reklamuyarı_${message.guild.id}`, 1)
              if (uyarisayisi === null) {
                  let uyari = new Discord.MessageEmbed()
                      .setColor("BLUE")
                      .setDescription(`<@${message.author.id}> **Lütfen Reklam yapma!**`)
                  message.channel.send(uyari);            
}
              if (uyarisayisi === 1) {
                  let uyari = new Discord.MessageEmbed()
                      .setColor("BLUE")
                      .setDescription(`<@${message.author.id}> **Lütfen Reklam yapma! 1/3**`)
                  message.channel.send(uyari);
              }
              if (uyarisayisi === 2) {
                  let uyari = new Discord.MessageEmbed()
                    .setColor("BLUE")
                   .setDescription(`<@${message.author.id}> **Ben sana söyledim son şansın bu kalıcı banlanıcan! 2/3**`)
                  message.channel.send(uyari);
              }
               if (uyarisayisi === 3) {
          
                  let uyari = new Discord.MessageEmbed()
                      .setColor("BLUE")
                      .setDescription(`<@${message.author.id}> **Kardeşim  bütün rollerini alıp seni banladım! 3/3**`)
                  message.channel.send(uyari)
            if(jail.match(/(\d{17,19})/g)) {
      kullanici.roles.cache.forEach(role => kullanici.roles.remove(role));
      kullanici.ban({reason: `Reklam`})
              kullanici.send(`3 defa uyarılmaya rağmen reklam yaptığın için banlandı!`)
              db.subtract(`reklamuyarı_${message.guild.id}`, 3)
              }
          }
      }
      } 
  }
})
client.on("message", async message =>  {
    if(message.author.bot || message.channel.type === "dm") return;
   if(message.content.toLowerCase() ==="sa"||message.content.toLowerCase() ==="sea"||message.content.toLowerCase() ==="selamün aleyküm"||message.content.toLowerCase() ==="selamun aleykum"){
     message.reply("**Aleyküm Selam Hoşgeldin**")
   }
 })
 
 client.on("message", async message =>  {
    if(message.author.bot || message.channel.type === "dm") return;
   if(message.content ==="Tag"||message.content ==="tag"||message.content ===".tag"){
     message.channel.send(`**♱**`)
   }
 })
 client.on("message", async message =>  {
    if(message.author.bot || message.channel.type === "dm") return;
   if(message.content ==="link"||message.content ==="Link"||message.content ===".link"){
     message.channel.send(`https://discord.gg/guardians`)
   }
 })
client.login(ayarlar.token)

  
  client.on("guildMemberAdd", async (member) => {
    member.setNickname(`• İsim | yaş`)
 });