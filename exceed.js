const Discord = require("discord.js");
const client = new Discord.Client();
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.isMentioned(client.user)){
          let res = message.content.split(" ");
          res.shift()
      switch(res[0].toLowerCase()){
        case "search":
        res.shift()
                message.channel.send(message.author.username+"-sama, I have retrieved the information for you.")
                message.channel.send("https://www.roguard.net/db/search/?search="+res.join("+"));
        break;
        
        case "vh40":
                message.channel.send(message.author.username+"-sama, here is the info you requested.")
                message.channel.send("VH40 WK 17th DEC by Idaliae")
        message.channel.send("straight-top right-top right (?)-btm right-up-down-tl(dragonfly)-right (?)-down-straight-left(Drake)");
        break;
        
        case "vh60":
                message.channel.send(message.author.username+"-sama, here is the info you requested.")
                message.channel.send("VH60 WK 17th DEC by Idaliae")
        message.channel.send("straight-left-left-ctr(eddga)-left-left-tl(maya)-tr(maya)-bl-left(gob lead)-right(gob lead)");
        break;
        
        case "et":
                message.channel.send(message.author.username+"-sama, please use this link.")
	        message.channel.send("http://www.roguard.net/game/endless-tower/")
        break;
        
        case "joke":
        let jokelist = [
            "Poring.. Poporing.. Then the next is Popopoporing?!",
            "Hollgrehenn!! You dunno what you're doing! Do you?!",
            "Gold Bolt!",
            "Fire Bolt! Lightening Bolt! Cold Bolt!... 2..220 Bolt?! ... What.. What is this?!",
            "Andre, Piere, Deniro's Mom... is Maya...",
            "Best solution to Mistress is alcohol!"
        ]
        message.channel.send(jokelist[Math.floor(Math.random()*jokelist.length)])
        break;
        
        case "help":
        default:
        message.channel.send("I am the Exceed Butler.")
        message.channel.send("Available commands: search <item>, vh40, vh60, et")
        break;
    
      }
  }
});
 
client.login("");
client.destroy().then(() => client.login())