const Discord = require("discord.js");
module.exports = {
   name: "embed-create",
   aliases: ["embed"],
   cooldowns: 10000,
   description: "Create Custom Embed",
   usage: "",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `FerviD`, url: `https://discordapp.com/users/945258423350612018`, iconURL: `https://media.discordapp.net/attachments/945623911121448970/945623946538156032/default.png?width=473&height=473` })
        .setColor(`WHITE`)
        .setTitle("Embed Creator")
        .setDescription("Select any option from the Select Menu in this message and i will collect all informations and create a embed for you using that data.\n\n Support Server: [JOIN](https://discord.gg/mfkCMHJARy)")
        .setTimestamp()
        .setImage(`Embed`)
        .setThumbnail(`https://media.discordapp.net/attachments/945623911121448970/945623946538156032/default.png?width=473&height=473`)
        .setFooter({ text: `Having issues join Support Server, Do f!support-server`, iconURL: `https://media.discordapp.net/attachments/945623911121448970/945623946538156032/default.png?width=473&height=473` })
    },
};