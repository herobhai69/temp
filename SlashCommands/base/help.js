const { Client, CommandInteraction } = require("discord.js");
const client = require("../../index");
const prefix = client.config.prefix;
module.exports = {
    name: "help",
    description: "get information about bot and its commands",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `Type: \`${prefix}help\` for getting help and information of bot.` });
    },
};