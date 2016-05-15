'use strict';

let motor;

let move = socket => {
  socket.on('forward', (from, cond) => {
    console.log(cond);
    //motor.forward(cond);
  });
};

module.exports = move;
