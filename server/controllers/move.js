'use strict';

let motor = require('../hardware/motor');

let move = socket => {
  socket.on('move', dir => {
    motor[dir]();
  });
};

module.exports = move;
