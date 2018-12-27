const Discord = require("discord.js");
let client = new Discord.Client();
const config = require("./config.json");
const joke = require("./joke.json");
let database = require("./exceed_db_condensed.json");
let Gacha = require("./gacha.js")
let gacha = new Gacha();

let dynamicCmds = {};

const printResult = (mob) => {
    let result = "";
    for(var key in mob){
        result+=key+":"+mob[key]+"\n";   
    }
    return result+"\n";
}
const getMob = (name) => {
    let searchRes = "";
    let pattern = new RegExp(name.toLowerCase().replace(/\s/g,''));
    let result = database.filter(x=>name.toLowerCase().replace(/\s/g,'')==x.name)
    searchRes += ("Found "+result.length+" result(s)\n");
    for(var i in result){
        searchRes += printResult(result[i]);   
    }
    return searchRes;
}
const rollDice = (faces,times) => {
	if(times==0) return 0;
	let res = Math.floor(Math.random() * faces)+1;
	return res + rollDice(faces,times-1);
}

const startNew = (client) => {
	client.on("ready", () => {
	  console.log("I am ready!");
	});
	let channel = null;
	client.on("message", (message) => {
	  channel = message.channel;
	  if (!message.content.startsWith(config.prefix) || message.author.bot) return; 
	 
		  let res = message.content.split(" ");
		  let command = res[0].toLowerCase().slice(1);
		  switch(command){
			case "search":
			res.shift()
					message.channel.send(message.author.username+"-sama, I have retrieved the information for you.")
					message.channel.send(config.roguard+res.join("+"));
			break;
			case "vh40":
					message.channel.send(message.author.username+"-sama, here are the directions for vh40.")
					message.channel.send(config.vh40)
			break;
			case "vh60":
					message.channel.send(message.author.username+"-sama, here are the directions for vh60.")
					message.channel.send(config.vh60)
			break;
			case "et":
					message.channel.send(message.author.username+"-sama, please use this link.")
					message.channel.send(config.et)
			break;
			case "nod":
					message.channel.send(message.author.username+"-sama, please return back safely.")
					 message.channel.send(config.nod)
			break;
			case "aesir":
					message.channel.send(message.author.username+"-sama, please use this information to your advantage.")
					 message.channel.send(config.aesir)
			break;
			case "joke":
					message.channel.send(joke[Math.floor(Math.random()*joke.length)])
			break;
			case "mob":
				  res.shift()
				  message.channel.send(getMob(res.join("")));
			break;
			case "time":
					var moment = require('moment');
					var now = moment().add(7,'h').format('H:mmA (DD/MM/YYYY)')
					message.channel.send(message.author.username+"-sama, server time now is "+now);
			break;
			case "gacha":
				res.shift()
				message.channel.send(gacha.insertCoin(res[0]))
			break;
			case "buyxmasblessingbox":
				message.channel.send(gacha.buyXMasBox())
			break;		
			case "addcmd":
				res.shift()
				let addcommand = res.shift();
				let remaining = JSON.parse(res.join(" "));
				dynamicCmds[addcommand] = remaining;
				message.channel.send("Added command <"+addcommand+"> with values "+remaining)
			break;
			case "rmcmd":
				res.shift();
				message.channel.send("Removed command <"+res[0]+">")
				delete dynamicCmds[res[0]]
			break;
			case "roll":
				res.shift();
				let [dices, faces] = res[0].split("d");
				if(!isNaN(dices)&&!isNaN(faces))
					message.channel.send(message.author.username+"-sama rolls a "+rollDice(faces,dices));
			break;
			case "help":
			default:
				if(dynamicCmds[command]){
					let info = dynamicCmds[command];
					for(var i in info){
						message.channel.send(info[i])
					}
				}
				else{
					message.channel.send("Exceed Kafra at your service!")
					message.channel.send("Available commands: search <item>, vh40, vh60, et, nod, joke, mob <name>, time, gacha <tries>, buyxmasblessingbox, aesir")
					if(Object.keys(dynamicCmds).length>0) message.channel.send("Temporary commands: "+Object.keys(dynamicCmds).join(","))
				}
			break;
		  }
	});

	client.on("guildMemberAdd", (member) => {
	  member.guild.channels.get("general").send("Welcome to Exceed, "+member.user.username+"!");
	  member.guild.channels.get("general").send("Please change your nickname to your RO Mobile in-game nick so we can identify you and don't forget to read the rules~");
	  member.guild.channels.get("general").send("hope you enjoy your stay here.");
	});

	client.login(config.token);
	client.on("error", (event) => {
		console.log(client.uptime/(100*60) + " minutes uptime")
		console.log("Logging in...");
		client.destroy().then(()=>{
			console.log("Creating a new client...")
			client = new Discord.Client
			console.log("Reinitialise")	
			startNew(client);
		}).catch(err => console.log(err));
	});
		
}

startNew(client);
