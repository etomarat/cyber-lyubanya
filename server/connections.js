'use strict';
let ngrok = require('ngrok');
let TelegramBot = require('node-telegram-bot-api');

const ngrokAuthtoken = '3M68jXE5tAqjGcgx1eS1c_5SknsdRmm44uv778yjBub';
const telegramAuthtoken = '161454266:AAH4XdTg9zqZ7U1iPQ_PciniGXH4LfeX6j8';
const myTelegramChatId = '114418853';

let ngrockPromises = (opts)=> {
  let promise = new Promise((resolve, reject) => {
    ngrok.disconnect();
    ngrok.connect(opts, function (err, url) {
      return err
          ? reject(err)
          : resolve(url);
    });
  });

  return promise;
};

let telegramBot = (links)=> {
  let bot = new TelegramBot(telegramAuthtoken, {polling: true});

  bot.on('message', function (msg) {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, 'reconnecting..');
    portForwarding();
  });

  let answer = `👋Привет! Жду тебя [тут](${links[0]})
_(а если нужен ssh, то используй: ${links[1]})_`;

  return bot.sendMessage(myTelegramChatId, answer);
};

let portForwarding = ()=> {
  let ports = [
    {
      proto: 'http',
      addr: 8010,
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
  })).then(telegramBot).catch(console.log);

};

module.exports = {
  portForwarding: portForwarding
};
