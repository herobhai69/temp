const Discord = require("discord.js");
const fetch = require("axios");
module.exports = {
   name: "site-screenshot",
   aliases: ["sss", "web-ss", "web-image"],
   cooldowns: 10000,
   description: "Get Screenshot of any website",
   usage: "<url>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],

   run: async (client, message, args) => {
      const notallowed = "https://"
      if(message.content.includes(notallowed)) return message.channel.send('Please Send url without `https://`');
      let url = args[0]
      if(!url) return message.channel.send("Please give a URL.\n Without `https://`");

      message.reply({ content: "Loading..."}).then(async msg => {

         const embed = new EmbedBuilder()
         .setTitle(`\`https://${url}\``)
         .setImage(`https://api.popcat.xyz/screenshot?url=https://${url}`)
         .setFooter({ text: `Used by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })

         message.channel.send({ embeds: [embed] })
         await msg.delete()
      })
      .catch(() => {
         return message.channel.send("Something went wrong, cannot screenshot that URL.")
      })

   },
};