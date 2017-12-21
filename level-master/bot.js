	
process.setMaxListeners(0); // OMG, its so simple... :D
process.setMaxListeners(1000)
const botSettings = require ("./botsetting.json");
const Discord = require("discord.js");

const prefix = botSettings.prefix;
const db = require('quick.db');
const economy = require('discord-eco');
var resultOpts = ["Result", "Exact result", "Decimal approximation"];
const modRole = 'MasterBasic Dev';
const fs = require('fs')
const bot = new Discord.Client();

bot.on("ready", () => {
  bot.user.setStatus("dnd");
console.log(`Connected As MasterBasic[] : bot Online`)
});


 bot.on("message",message => {
    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let args = message.content.slice(prefix.length).trim().split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let cmd = args.shift().toLowerCase(); // This takes away the first object in the cont array, then puts it in this.

    // Message Leveling System - Make sure you require quick.db
    db.updateValue(message.author.id + message.guild.id, 1).then(i => { // You pass it the key, which is authorID + guildID, then pass it an increase which is 1 in this instance.
        // It also returns the new updated object, which is what we will use.

        let messages; // Create an empty variable - These IF statements will run if the new amount of messages sent is the same as the number.
    if (i.value == 10) messages = 10; // Level 1
        else if (i.value == 25) messages = 25; // Level 2
        else if (i.value == 50) messages = 50;
        else if (i.value == 100) messages = 100;
        else if (i.value == 200) messages = 200;
        else if (i.value == 500) messages = 500;
        else if (i.value == 1000) messages = 1000;
        else if (i.value == 1500) messages = 1500;
        else if (i.value == 2000) messages = 2000; 

        if (!isNaN(messages)) { // If messages IS STILL empty, run this.
            db.updateValue(`userLevel_${message.author.id + message.guild.id}`, 1).then(o => { // This returns the updated object of userLevel_ID. 
                message.reply(`GG You are An Active Member I rewarded you a level ${o.value} | You have Leveled Up ! :tada:`) // Send their updated level to the channel.
            })
        }

    })

    // We also need to make sure it doesn't respond to bots
    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return; // We also want to make it so that if the message does not start with the prefix, return.
});
// We can call the file with all the functions here.
const func = require('./functions.js'); // If this returns an error for you (or you might be on ubuntu/linux), try '../functions.js'    
// You can also change the name of func to something else like tools.

bot.on('message', message => {

        // Variables - Variables make it easy to call things, since it requires less typing.
        let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
        let sender = message.author; // This variable takes the message, and finds who the author is.
        let args = message.content.slice(prefix.length).trim().split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
        let cmd = args.shift().toLowerCase(); // This takes away the first object in the cont array, then puts it in this.

    // Command Handler - .trim() removes the blank spaces on both sides of the string
    try {
        let commandFile = require(`./commands/${cmd}.js`); // This will assign that filename to commandFile
        commandFile.run(bot, message, args, func); // This will add the functions, from the functions.js file into each commandFile.
    } catch (e) { // If an error occurs, this will run.
    }
bot.on('message',message => {
});

bot.on('guildMemberAdd', guildMember => {

    // Check if the guild has a custom auto-role
    db.fetchObject(`autoRole_${guildMember.guild.id}`).then(i => {

        // Check if no role is given
        if (!i.text || i.text.toLowerCase() === 'none') return; // Do nothing if no role is found...
        else { // Run if a role is found...

            try { // Try to add role...
                guildMember.addRole(guildMember.guild.roles.find('name', i.text))
            } catch (e) { // If an error is found (the guild supplied an invalid role), run this...
                console.log("A guild tried to auto-role an invalid role to someone.") // You can commet this line out if you don't want this error message
            }

        }
    })
})
});


   // The code will go here, inside the oter fetchObect. If you don't have that fetchObject don't worry just put it in bot.on('guildMem
bot.login("Mzg5MjIwODkwNjU2NzY4MDAw.DRNpHA.kU69whh4N7Ez1CjipjVEIAQj5Z8")
//"MzgzMDA4NzMyNjg4MTU0NjI0.DPeANw.bL7kXp05PfVXsK_LUbu_vV779Bw"