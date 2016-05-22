'use strict';

let express = require('express');
let app = express();
let server = require('http').Server(app);
let socketio = require('socket.io')(server);
let routes = require('./routes')(app, socketio);
let connections = require('./connections');

let port = 8010;

app.use(express.static('client/assets'));

server.listen(port);
console.log(`Server listennning on por: ${port}`);
connections.portForwarding();
