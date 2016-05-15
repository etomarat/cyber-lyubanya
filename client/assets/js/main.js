$(function() {

  var move = io.connect('http://localhost:8010/move');

  var joystick = nipplejs.create({
    //zone: document.getElementById('dynamic'),
    color: 'blue'
  });

  joystick.on('start end', (e, data) => {
    //console.log(e);
    //console.log(data);
  })
  .on('dir', (e, data) => {
    move.emit('forward', true);
    console.log(data);
  });

});
