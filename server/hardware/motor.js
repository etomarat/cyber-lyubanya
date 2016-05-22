'use strict';

let gpio = require('pi-gpio');
let lodash = require('lodash');

const pins = {
  leftForward: 35,
  rightForward: 36,
  leftBackward: 37,
  rightBackward: 38
};

let writePromise = (pin, val) => {
  return new Promise((resolve, reject) => {
    gpio.open(pin, 'output', function(err) {
      if (err) reject(err);
      gpio.write(pin, val, function() {
        gpio.close(pin);
        resolve(true)
      });
    });
  });
};

let stop = ()=> {
  return Promise.all(_.values(pins).map(pin, {
    return writePromise(pin, 0);
  }));
};

let forward = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftForward, 1)
    .then(writePromise.bind(null, pins.rightForward, 1);
};

let backward = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftBackward, 1)
    .then(writePromise.bind(null, pins.leftBackward, 1);
};

let left = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftBackward, 1)
    .then(writePromise.bind(null, pins.rightForward, 1);
};

let right = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.rightForward, 1)
    .then(writePromise.bind(null, pins.leftBackward, 1);
};

module.exports = {
  stop: stop,
  forward: forward,
  backward: backward,
  left: left,
  right: right
};
