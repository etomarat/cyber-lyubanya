'use strict';

let motor;

let move = socket => {
  socket.on('move', dir => {
    motor[dir]();
  });
};

module.exports = move;
