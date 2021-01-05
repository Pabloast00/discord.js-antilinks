const AntiLinks = require("capo-anti-links"),
  checkDomains = new AntiLinks("domains"),
  checkYouTube = new AntiLinks("youtube");
const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  if (!message.guild || !message.content) return;
  if (checkDomains.check(message.content) || checkYouTube.check(message.content)) {
    return message.delete();
  }
});

client.login("token");
