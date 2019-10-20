const db = require('quick.db')

exports.run = (client, message, args, func) => {
  
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('This requires you to have a role with `MANAGE MESSAGES`'); // Tell them if they don't have the proper permissions.
    if (!args.join(" ")) return message.channel.send('Please enter arguments. `setPrefix <prefix>`'); // Tell them if they didn't supply any arguments.

    db.set(`guildPrefix_${message.guild.id}`, args.join().trim()).then(i => { // Update the text field in that ID. .trim() removes the whitespaces on both side.

        message.channel.send('Prefix changed to ' + i); // Post in chat with the new prefix!

    })

}
  
