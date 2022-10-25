const client = require("../index");
const prefix = ('>');
const { version: discordjsVersion } = require("discord.js");

client.on("ready", async () => {
  client.user.setActivity(
    `${prefix}help || ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? "Servers" : "Server"
    }`,
    { type: "WATCHING" }
  );
  console.log(`Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
    2
  )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
    2
  )} MB`)
});