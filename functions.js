module.exports = {
  
  embed: function(channel, message, timer) {
    
    channel = channel.channel || channel;
    
    channel.send({embed:{
      description: message,
      color: 'RANDOM',
    }}).then(msg => {
      if(!Number(timer)) msg.delete({timeout: timer})
    })
      
   
}
    
  
}


