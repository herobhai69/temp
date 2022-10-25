const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
   name: "song-lyrics",
   aliases: ["ls", "lyrics"],
   cooldowns: 10000,
   description: "Get Info and Lyrics of any song",
   usage: "[song name]",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],

   run: async (client, message, args) => {
       let sname = args.join(" ")
       if(!sname) return message.channel.send("Please Give name of song.")
       if(sname) {
         fetch(`https://api.popcat.xyz/lyrics?song=${sname}`)
         .then(title => title.json(), artist => artist.json(), lyrics => lyrics.json(), image => image.json())
         .then(data => {
            const embed = new EmbedBuilder()
            .setTitle(`${data.title}`)
            .setDescription(`${data.lyrics}`)
            .setThumbnail(`${data.image}`)
            .setAuthor({ name: `${data.artist}` })
            .setFooter({ text: `Used by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })

            message.channel.send({ embeds: [embed] })
         })
       }
   },
};