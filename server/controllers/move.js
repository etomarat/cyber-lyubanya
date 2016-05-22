'use strict';

let motor;

let move = socket => {
  socket.on('forward', (from, cond) => {
    console.log(from, cond);
    //motor.forward(cond);
  });
};

module.exports = move;
