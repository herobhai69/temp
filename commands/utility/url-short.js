const Discord = require("discord.js");
const fetch = require('node-fetch');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const size = 7;
const nanoid = customAlphabet(alphabet, size);
module.exports = {
   name: "url-short",
   aliases: ["short-url", "small-url", "url-shortner"],
   cooldowns: 10000,
   description: "Shorten a link with our domain `short.fervid.eu.org`",
   usage: "<link>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],

   run: async (client, message, args) => {
       const notallowed = "https://"
       if(message.content.includes(notallowed)) return message.channel.send('Please Send url without `https://`');
       let url = args[0]
       if(!url) return message.channel.send("Please give a URL.\n Without `https://`");
       let id = nanoid();
       const options = {
           method: 'GET',
           headers: {Accept: 'application/json', workspace: 'd69c7a08e70249719ed9166f1dd11711', apikey: 'cd7c3a4c6aaf42b78bec8ac17790269f'}
      };
       if(url) {
           fetch(`https://api.rebrandly.com/v1/links/new?destination=https%3A%2F%2F${url}&slashtag=${id}&domain[id]=cb756b716aa0409cb4bc9208c6e55997&domain[fullName]=short.fervid.eu.org`, options)
           .then(response => response.json())
           .then(data => {
               const embed = new EmbedBuilder()
               .setTitle("Url Shortned")
               .setDescription(`Given URL: \`https://${url}\`\n Shortned URL: https://${data.shortURL}`)
               .setFooter({ text: `Used by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
               .setTimestamp()
 
               message.channel.send({ embeds: [embed] })
           })
           .catch(err => message.channel.send("ℹ | An Error Occured"));
       }
   },
};