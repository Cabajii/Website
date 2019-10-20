const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db")
const func = require('./functions.js')
require(__dirname + '/app/keepAlive.js')

//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
    //Events "handler"
    fs.readdir('./events/', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`);
            console.log("Successfully loaded " + file)
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args));
        });
});

client.on("ready", () => console.log("BOT HAS STARTED!!"));
client.login("NjA1OTI3NTIyNTY3NDU0NzQw.XZYySA.wdrx3Y0oaeIQ6v6xRh3DAkxG4xs")

client.on("ready", () => {

    client.user.setActivity(`Ap_G | ! | ${client.guilds.size} servers`, {type: "WATCHING"});
    client.user.setStatus('dnd'); // status like dnd, online, idle or invisble

});

client.on("message", message => {
     let prefix;
  db.fetch(`guildPrefix_${message.guild.id}`).then(i => {
    if(i) {
      prefix = i
    } else {
      prefix = '!'
    }
    
  })
  
});

client.on('guildMemberAdd', member => { // Make sure this is defined correctly.

    // Check if the guild has a custom auto-role
    db.fetch(`autoRole_${member.guild.id}`).then(i => {

        // Check if no role is given
        if (i === null || i.toLowerCase() === 'none'); // We want to put this un our guildMemberAdd, but we want to delete the return statement and just replace it with ; so it can run the rest of the code
        else { // Run if a role is found...

            try { // Try to add role...
                member.addRole(member.guild.roles.find('name', i))
            } catch (e) { // If an error is found (the guild supplied an invalid role), run this...
                console.log("A guild tried to auto-role an invalid role to someone.") // You can commet this line out if you don't want this error message
            }

        }

        // The code will go here, inside the other fetchObject. If you don't have that fetchObject don't worry just put it in bot.on('guildMemberAdd').

        // Fetch the channel we should be posting in - FIRST, we need to require db in this app.js
        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            // Fetch Welcome Message (DMs)
            db.fetch(`joinMessageDM_${member.guild.id}`).then(o => {

                // DM User
                if (!o.text) console.log('Error: Join DM Message not set. Please set one using ~setdm <message>'); // This will log in console that a guild didn't set this up, you dont need to include the conosle.log
               else func.embed(member, o.replace('{user}', member).replace('{members}', member.guild.memberCount)) 
                // Now, return if no message channel is defined
                if (!member.guild.channels.get(i)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel') // Again, this is optional. just the console.log not the if statement, we still want to return

                // Fetch the welcome message
                db.fetch(`joinMessage_${member.guild.id}`).then(p => {

                    // Check if they have a join message
                    if (!p.text) console.log('Error: User Join Message not found. Please set one using ~setwelcome <message>')
                    else console.log(member.guild.channels.get(i), p.replace('{user}', member).replace('{members}', member.guild.memberCount)) // We actually want to send the message.

                })

            })

        })

    })

 

    // Now, since we're done with the welcome. lets do the leave
  client.on('guildMemberRemove', member => {

        // Fetch Channel
        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            // If the channel is not found, return.
            if (!member.guild.channels.get(i)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel')

            // Fetch Leave Message
            db.fetch(`leaveMessage_${member.guild.id}`).then(o => {
                
                // Check if o.text is defined
                if (!o.text) console.log( 'Error: User leave message not found. Please set one using ~setleave <message>')
                else func.embed(member.guild.channels.get(i), o.replace('{user}', member).replace('{members}', member.guild.memberCount)) // Now, send the message.

            })

        })

    })

})


