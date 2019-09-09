const Discord = require('discord.io');
const winston = require('winston');
const auth = require('./auth.json');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({ colorize: true })
  ]
});

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == '!') {
    let args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;
      case 'help':
        bot.sendMessage({
          to: channelID,
          message: `
help: Print this message
ping: Reply "Pong!"
`
        });
        break;
    }
  }
});
