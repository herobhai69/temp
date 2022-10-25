const client = require("../index");
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const cooldown = new Collection()
const ms = require('ms')
const { developerID } = require("../botconfig/main.json");
const { premium } = require("../botconfig/main.json")
const { slash } = require(`${process.cwd()}/functions/onCoolDown.js`);

client.on("interactionCreate", async (interaction) => {
  // ———————————————[Slash Commands]———————————————
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => { });

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({ content: "An error has occured " });
    try {
      if (cmd.toggleOff) {
        return await interaction.reply({
          ephemeral: true,
          embeds: [new EmbedBuilder()
            .setTitle(`❌ **That Command Has Been Disabled By The Developers! Please Try Later.**`).setColor(client.embed.wrongcolor)
          ]
        }).catch((e) => {
          console.log(e)
        });
      }
      if (cmd.maintenance) {
        return await interaction.reply({
          ephemeral: true,
          content: `❌ **${cmd.name} command is on __Maintenance Mode__** try again later!`
        })
      }
      if (cmd.guildOnly) {
        if (!premium.includes(interaction.guild.id)) {
          return interaction.reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setTitle(`❌ ${interaction.user.username} You have entered an invalid command!`)
                .setDescription(`The command \`${cmd.name}\` can only be used in the official server.`).setColor(client.embed.wrongcolor)
            ]
          })
        }
      }
      if (cmd.developersOnly) {
        if (!developerID.includes(interaction.user.id)) return;
      }
      if (cmd.nsfwOnly && !interaction.channel.nsfw) {
        return interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setDescription(`❌ This command can only be used in NSFW channels!`)
              .setColor(client.embed.wrongcolor)
          ]
        })
      }
      if (!message.member.permissions.has(cmd.userpermissions || [])) {
        return message.reply(`❌ | You Don't Have Permissions To Use The Command!`);
      } else if (!message.guild.me.permissions.has(cmd.botpermissions || [])) {
        return message.reply(`❌ | I Don't Have Permissions To Use The Command!`);
      }
      if (cmd.cooldowns) {
        if (client.cooldowns.has(`${cmd.name}${message.author.id}`)) {
          return message.reply(`ℹ | You Need To Wait \`${ms(client.cooldowns.get(`${cmd.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${cmd.name}\` again!`);
        }

        client.cooldowns.set(
          `${cmd.name}${message.author.id}`,
          Date.now() + cmd.cooldowns
        );

        setTimeout(() => {
          client.cooldowns.delete(`${cmd.name}${message.author.id}`);
        }, cmd.cooldowns);
      }
    } catch (error) {
      client.slash_err(client, interaction, error);
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }
  // ———————————————[Buttons]———————————————
  if (interaction.isButton()) {
  }
  // ———————————————[Select Menu]———————————————
  if (interaction.isSelectMenu()) {
  }
  // ———————————————[Context Menu]———————————————
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});