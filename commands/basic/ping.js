const Discord = require("discord.js");

module.exports = {
   name: "ping",
   aliases: ["p", "pong"],
   description: "Returns Websocket Ping",
   botpermissions: ["SEND_MESSAGES"],
   usage: "",
   cooldowns: 5000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
      message.channel.send(`Pinging...`).then((m4) => {
         setTimeout(() => {
            m4.edit(`\`${client.ws.ping}ms\` is my latency`);
         }, 2000);
      });
   },
};