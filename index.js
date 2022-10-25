const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    131071
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

require(`colors`)
module.exports = client;

// Global Variables
const { slash, prefix } = require(`${process.cwd()}/functions/cmdErrorLogs.js`);
client.slash_err = slash;
client.msg_err = prefix;
client.slashCommands = new Collection();
client.categories = new Collection();
client.buttons = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();
client.config = require("./config.json");

// Initializing the project
[`server`, `index`, `anticrash`].forEach((handler) => {
  require(`./handler/${handler}`)(client)
});

client.login(client.config.token);