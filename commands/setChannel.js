const db = require("quick.db")


  
const Discord = require("discord.js");


exports.run = (client, message, args) => {
  
      if (!message.member.roles.find('name', 'Owner')) return message.channel.send('**This command requires the Owner role**') // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') message.channel.send('**Please mention a channel**\n > *~setChannel #channel*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    // Fetch the new channel they mentioned
    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; // If they wrote the word none, it sets newChannel as empty.
    else newChannel = message.mentions.channels.first().id; // If they actually mentioned a channel, it will set newChannel as that.

    // Update Channel
    db.set(`messageChannel_${message.guild.id}`, newChannel).then(i => {
        message.channel.send(`**Successfully updated logging channel to ${message.mentions.channels.first()}**`) // Finally, send in chat that they updated the channel.
    })
}