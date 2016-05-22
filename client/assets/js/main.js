$(function() {

  var move = io.connect('/move');

  var joystick = nipplejs.create({
    //zone: document.getElementById('dynamic'),
    color: 'blue'
  });

  joystick.on('start end', (e, data) => {
    //console.log(e);
    //console.log(data);
  })
  .on('dir', (e, data) => {
    move.emit('move', data.direction.angle);
    console.log(data);
  })
  .on('end', e => {
    move.emit('move', 'stop');
  });

});
