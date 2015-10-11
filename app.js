/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');

// Setup polling way
var bot = new TelegramBot(config.api.telegram.token, {polling: true});

console.log('app started');

//bot.onText(/\/echo (.+)/, function (msg, match) {
//    var fromId = msg.from.id;
//    var resp = match[1];
//    bot.sendMessage(fromId, resp);
//    console.log(fromId);
//});

var users = {};

bot.onText(/\/remember/,function(msg, match){
    users[msg.from.id] = true;
    console.log('join', users);

});

bot.onText(/\/stop/,function(msg, match){
    delete users[msg.from.id];
    bot.sendMessage(msg.from.id, config.finish_message);
    console.log('leave', users);

});

setInterval(function(){
    for(var key in users){
        bot.sendMessage(key, config.message);
    }
}, 1000);

// Any kind of message
//bot.on('message', function (msg) {
//    var chatId = msg.chat.id;
//    // photo can be: a file path, a stream or a Telegram file_id
//    var photo = 'cats.png';
//    bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
//});