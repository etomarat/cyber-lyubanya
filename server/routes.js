'use strict';

var path = require('path');
var move = require('./controllers/move');

module.exports = (app, socketio) => {
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(`${__dirname}/../client/index.html`));
  });

  socketio.of('/move').on('connection', move);
};
