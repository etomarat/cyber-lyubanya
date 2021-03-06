'use strict';

let gpio = require('pi-gpio');
let _ = require('lodash');

const pins = {
  leftForward: 35,
  rightForward: 36,
  leftBackward: 37,
  rightBackward: 38
};

let writePromise = (pin, val) => {
  return new Promise((resolve, reject) => {
    gpio.open(pin, 'output', (err) => {
      if (err) {
        reject(err);
      }
      gpio.write(pin, val, () => {
        //gpio.close(pin);
        resolve(true);
      });
    });
  });
};

let stop = ()=> {
  let allPins = _.values(pins);
  let stopArr = allPins.map(pin => {
    return gpio.close(pin);
  });
  return Promise.all(stopArr);
};

let forward = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftForward, 1))
    .then(writePromise.bind(null, pins.rightForward, 1));
};

let backward = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftBackward, 1))
    .then(writePromise.bind(null, pins.rightBackward, 1));
};

let left = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.leftBackward, 1))
    .then(writePromise.bind(null, pins.rightForward, 1));
};

let right = ()=> {
  return stop()
    .then(writePromise.bind(null, pins.rightBackward, 1))
    .then(writePromise.bind(null, pins.leftForward, 1));
};

module.exports = {
  stop: stop,
  up: forward,
  down: backward,
  left: left,
  right: right
};
