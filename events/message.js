let owner = "383965932822724619"
let mainguildID = "613362355203604491"
  

 exports.run = async(client, message, args, func) => {
  if (message.author.bot) return;
   

  if (message.content.startsWith(prefix)) {
    
 let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
if(!commandfile) return;    
    commandfile.run(client, message, args, func);

 }
                            
  }