var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(require('express').static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log("A new user has just connected");

    socket.on('disconnect', () => {
        console.log("A user has left");
    });

    socket.on('add-message', (message, username, flag) => {
        io.emit('message', {type: 'new-message', text: message, username: username, currentUser: flag})
    })
})

http.listen(3000, () => {
    console.log('Server is running on port 3000');
})