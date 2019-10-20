const Discord = require("discord.js");


exports.run = async(client, message, args) => {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    const m = await message.channel.send("***pOnG***");
  
     const embed = new Discord.RichEmbed()
        .setTitle(`If yOu DoNt kNoW wHaT ThIs Is`)
        .setColor(`RANDOM`)
        .addField(`${m.createdTimestamp - message.createdTimestamp}ms` , "^ **LATENCY**")
        .addField(`${Math.round(client.ping)}ms` , "^ **API LATENCY**")
        .setFooter("Made by: Grasse#0397")
        .setURL(`https://medium.com/@sanjay.rajak/api-latency-vs-response-time-fe87ef71b2f2`)
    message.channel.send(embed);
    message.react('🏓')
     }
  
