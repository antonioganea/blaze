var botReady = false;

var admin = {
	// To be used sparingly
	notify : function ( text ){
		if ( botReady ){
			broadcast(text);
		}
	}
}

try{
	var adminArray = [process.env.ADMIN_ID];
	var Telegraf = require('telegraf');
	var bot = new Telegraf(process.env.BOT_TOKEN);
	bot.launch();
	botReady = true;
}
catch( e ){
	//console.log(e);
	console.log("telegraf notifications not available");
}

function broadcast(text){
	for ( let i = 0; i < adminArray.length; i++ ){
		bot.telegram.sendMessage(adminArray[i],text);
	}
}

module.exports = admin;