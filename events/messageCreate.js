const client = require("../index");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
const { developerID } = require("../botconfig/main.json");
const { premium } = require("../botconfig/main.json")
const { clientavatar } = require("../botconfig/main.json");
const { clientname } = require("../botconfig/main.json");
const prefix = client.config.prefix;
const { randomMessages_Cooldown } = require("../botconfig/main.json");

client.on("messageCreate", async (message) => {
  try {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.toLowerCase().startsWith(client.config.prefix)
    )
      return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);
    const [cmd, ...args] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(" ");
    if (cmd.length === 0) return message.reply(`❌ | Please Provide A Command To Be Executed!`);

    const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return;
    if (command) {
      try {
        if (command.toggleOff) {
          return message.reply(`❌ | That Command Has Been Disabled By The Developers! Please Try Later.`);
        } else if (command.maintenance) { return message.reply(`❌ | Command is currently in Maintenance, Try again Later.`) } else if (!message.member.permissions.has(command.userpermissions || [])) {
          return message.reply(`❌ | You Don't Have Permissions To Use The Command!`);
        } else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
          return message.reply(`❌ | I Don't Have Permissions To Use The Command!`);
        } else if (command.developersOnly) {
          if (!developerID.includes(message.author.id)) {
            return;
          }
        } else if (command.nsfwOnly && !message.channel.nsfw) { return message.reply(`❌ | Command is NSFW and can only work in NSFW channels.`) } else if (command.guildOnly) {
          if (!premium.include(message.guild.id)) return message.reply(`❌ | Command can only work in Premium Servers`)
        } else if (command.cooldowns) {
          if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
            return message.reply(`ℹ | You Need To Wait \`${ms(client.cooldowns.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${command.name}\` again!`);
          }

          client.cooldowns.set(
            `${command.name}${message.author.id}`,
            Date.now() + command.cooldowns
          );

          setTimeout(() => {
            client.cooldowns.delete(`${command.name}${message.author.id}`);
          }, command.cooldowns);
        }
        await command.run(client, message, args)
        const commandLogsChannel = client.channels.cache.get('1007162388128219216');
        commandLogsChannel.send({
          embeds: [new EmbedBuilder()
            .setColor('#ffff00')
            .setAuthor({
              name: message.guild.name, iconURL: message.guild.iconURL({
                dynamic: true
              })
            })
            .setTitle(`Prefix Command`)
            .addFields([
              { name: "**Author**", value: `\`\`\`yml\n${message.author.tag} [${message.author.id}]\`\`\`` },
              { name: "**Command Name**", value: `\`\`\`yml\n${command.name}\`\`\`` },
              { name: `**Guild**`, value: `\`\`\`yml\n${message.guild.name} [${message.guild.id}]\`\`\`` }
            ])
          ]
        });
      } catch (error) {
        console.log(error)
        return message.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`${emojis.MESSAGE.x} Something went wrong while, running the: ${prefix}${command.name} command`).setColor(client.embed.wrongcolor)
          ]
        }).then(msg => {
          setTimeout(() => {
            msg.delete().catch((e) => {
              console.log(String(e).grey)
            })
          }, 4000)
        }).catch((e) => {
          console.log(String(e).grey)
        });
      }
    }
  } catch (error) {
    client.msg_err(client, message, error);
  }
});