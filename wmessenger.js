var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));


console.log('[WMessenger] server is up on :3000');


connections = [];

io.sockets.on('connection', function(socket) {
    console.log('[WMessenger] new connection');
    connections.push(socket);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('sendMessage', function(data) {
        console.log('[WMessenger] new message: ' + data);
        io.sockets.emit('displayMessage', { author: 'SkyWex', message: data });
        socket.broadcast.emit('playNotificationSound');
    });
});