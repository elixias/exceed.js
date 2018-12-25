const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
let database = require("./exceed_db_condensed.json");
/*
let res = database.map(x => {
return {
    "Name":x._source.NameZh_ragmobile,
    "ROM Nature":x._source.Nature_ragmobile,
    "Nature":x._source.Nature,
    "Base":x._source.BaseExp,
    "Job":x._source.JobExp,
    "Desc":x._source.Desc,
    "Race":x._source.Race,
    "ROM Race":x._source.Race_ragmobile,
    "HP":x._source.Hp,
    "Lvl":x._source.Level
}
})
*/
const printResult = (mob) => {
    let result = "";
    for(var key in mob){
        result+=key+":"+mob[key]+"\n";   
    }
    return result+"\n";
    //return result;
}
const getMob = (name) => {
    let searchRes = "";
    let pattern = new RegExp(name.toLowerCase().replace(/\s/g,''));
    let result = database.filter(x=>name.toLowerCase().replace(/\s/g,'')==x.name.toLowerCase().replace(/\s/g,''))//x=> pattern.test(x.name.toLowerCase().replace(/\s/g,'')) 
    searchRes += ("Found "+result.length+" results\n");
    for(var i in result){
        searchRes += printResult(result[i]);   
    }
    return searchRes;
}

client.on("ready", () => {
  console.log("I am ready!");
});

let channel = null;
client.on("message", (message) => {
    channel = message.channel;
  if (!message.content.startsWith(config.prefix) || message.author.bot) return; //prevent bots from talking to themselves in a loop
  
      let res = message.content.split(" ");
      switch(res[0].toLowerCase().slice(1)){
        case "search":
        res.shift()
                message.channel.send(message.author.username+"-sama, I have retrieved the information for you.")
                message.channel.send("https://www.roguard.net/db/search/?search="+res.join("+"));
        break;
        
        case "vh40":
                message.channel.send(message.author.username+"-sama, VH info contributed by Smurtify-sama.")
                message.channel.send("VR40-(start)Straight-Btm-Btm-Btm (eclipse)-left (ghostring)-Right (bane)-Top (Goblin lead)-Right-Middle (devilling)(end)")
        break;
        
        case "vh60":
                message.channel.send(message.author.username+"-sama, VH info contributed by Smurtify-sama.")
                message.channel.send("(start)Straight - Left (gryphon) - Right - Middle (goblin lead) - Left - Right (goblin lead) - Left - Btm right - Btm right (dragon fly) - Top right (eddga)(end)")
        break;
        
        case "et":
                message.channel.send(message.author.username+"-sama, please use this link.")
				message.channel.send("http://www.roguard.net/game/endless-tower/")
        break;
        
        case "nod":
                message.channel.send(message.author.username+"-sama, please return back safely.")
				message.channel.send("https://www.reddit.com/r/RagnarokMobile/comments/9zb3jl/guide_night_of_destruction/")
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
              
        case "mob":
              res.shift()
              message.channel.send(getMob(res[0]));
        break;
        
        case "help":
        default:
        message.channel.send("I am the Exceed Maid.")
        message.channel.send("Available commands: search <item>, vh40, vh60, et, nod, joke")
        break;
    
      }
  
});

client.login(config.token);
client.on("disconnect", (event) => {
	channel.send("Masters, I am taking a break after "+ client.uptime/(100*60) + " minutes. I will take my leave.")
	channel.send("Wait! I still have things to do... trying to come back...")
	client.login(config.token);
})
