const Discord = require('discord.js');
var bot = new Discord.Client();
bot.on('ready', () => {
	console.log("IceDev est prêt au démarrage.");
	bot.user.setActivity("aider IceFireZ !", { type: 'PLAYING' })
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
	if(message.channel.id === '470884370773966859'){
		if(message.content === "!new"){

			message.guild.createChannel('commande-'+message.author.username, 'text', [{
				id: message.guild.id,
 				deny: ['READ_MESSAGES'],
			}, {
				id: message.author.id,
 				allow: ['READ_MESSAGES'],
			}]);
			message.reply("Le channel de votre commande à bien été créé.");
		}

		if(message.content === "!help"){
		const embed = new Discord.RichEmbed();
			embed.setTitle('Commandes du bot IceDev :')
			.addField("!help", "> Connaître toutes les informations sur le bot.")
			.addField("!new", "> Ouvrir une commande.")
			.addField("!close", "> Fermer une commande (à exécuté dans le channel de commande).")

			.setFooter('Créé par IceFireZ#4848 - Tous droits réservés.');
			message.channel.send(embed);
		}
	}

	if(message.content === "!close"){
		if(message.channel.name.startsWith("commande-")){
				message.channel.delete();
		}
	}
})

bot.on('channelCreate', channel =>{
	if(channel.name.startsWith("commande-")){
			const embed = new Discord.RichEmbed();
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();

			if(dd<10) {
    			dd = '0'+dd
			} 

			if(mm<10) {
    			mm = '0'+mm
			} 

			today = dd + '/' + mm + '/' + yyyy;
			embed.setTitle("Salon de commande créé le " + today + ".")
			.setDescription("Veuillez préciser votre demande en me détaillant le plus possible ce que vous souhaitez !")
			.setFooter("Créé par IceFireZ#4848 - Tous droits réservés.");
			channel.send(embed);
	}
})

bot.on('guildMemberAdd', member => {
 const channel = member.guild.channels.find('name', 'accueil');

 if(!channel) return;
 channel.send("Bienvenue à " + member.user.tag + ". Tu veux connaître les commandes > #liste-commandes. Pour savoir comment passer une commande > #comment-faire.");
 })
