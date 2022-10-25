const Discord = require("discord.js");
module.exports ={
name: "calculator",
aliases: ['calc', 'calculate'],
cooldowns: 10000,
description: "Do Mathematical Calculation",
usage: "",
toggleOff: false,
developersOnly: false,
userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
botpermissions: ["SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
run:async(client,message,args)=>{
    message.channel.send('Command in Setup')
    }
}