'use strict';
var ngrok = require('ngrok');
var TelegramBot = require('node-telegram-bot-api');

const ngrokAuthtoken = '3M68jXE5tAqjGcgx1eS1c_5SknsdRmm44uv778yjBub';
const telegramAuthtoken = '161454266:AAH4XdTg9zqZ7U1iPQ_PciniGXH4LfeX6j8';

let ngrockPromises = (opts)=> {
  let promise = new Promise((resolve, reject) => {
    ngrok.connect(opts, function (err, url) {
      return err
          ? reject(err)
          : resolve(url);
    });
  });

  return promise;
};

let telegramBot = ()=> {
  let bot = new TelegramBot(telegramAuthtoken);

  bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, chatId);
  });
};

let portForwarding = ()=> {
  let ports = [
    {
      proto: 'http',
      addr: 80,
      authtoken: ngrokAuthtoken
    },
    {
      proto: 'tcp',
      addr: 22,
      authtoken: ngrokAuthtoken
    }
  ];

  return Promise.all(ports.map(port =>{
    return ngrockPromises(port);
  })).then(links => {
    console.log(links);
    telegramBot();
  });

};

module.exports = {
  portForwarding: portForwarding
};
