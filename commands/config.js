const db = require("quick.db")
const Discord = require("discord.js")

exports.run = (client, message, args) => {

  



let channel
let dmText
let joinText
let leaveText

db.fetch(`messageChannel_${message.guild.id}`).then(channelIDFetched => {

  if(!message.guild.channels.get(channelIDFetched)) channel = '*none*'
  else channel = message.guild.channels.get(channelIDFetched)
  db.fetch(`joineMessageDM_${message.guild.id}`).then(joinDMFetched => {
    
    if(!joinDMFetched) dmText = "*none*"
    else dmText = joinDMFetched
    
    db.fetch(`joinMessage_${message.guild.id}`).then(joinTextFetched => {
      
      if(!joinTextFetched) joinText = "*none*"
      else joinText = joinTextFetched
    
      db.fetch(`leaveMessage_${message.guild.id}`).then(leaveTextFetched => {
        
      if(!leaveTextFetched) leaveText = '*none*'
         else leaveText = leaveTextFetched
        
        let response = `**Logging Channel**: ${channel}\n\n`
        response += `**Welcome DM Text**: ${dmText}\n\n`
        response += `**Welcome Channel Text**: ${joinText}\n\n`
        response += `**Leave Channel Text**: ${leaveText}\n\n`
        
      message.channel.send(response)
      
      })
        
    })
                                                           

   })


})
                                                         
  
}
