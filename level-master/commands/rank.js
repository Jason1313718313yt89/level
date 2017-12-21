// Now, lets let the user fetch their level & messages
const db = require('quick.db'); // We need to require quick.db in every file it's used in.

exports.run = (bot, message, args, func) => {
const { RichEmbed, version } = require('discord.js');

    db.fetchObject(message.author.id + message.guild.id).then(i => { // This is the object of messages sent
        db.fetchObject(`userLevel_${message.author.id + message.guild.id}`).then(o => { // This is the object of their level
              var embed = new RichEmbed()
.setColor("RANDOM")
     .setTimestamp()
     .setTitle(message.author.username)
     .addField("Level" , o.value)
 .addField("XP", `${i.value + 1} / 50000`)  
          .addField("Username", `${message.author.username}`)
     message.channel.send({embed});

        })
    })

}