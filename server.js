var app = require('express')();
const cors = require('cors');

const nodePort = process.env.PORT || 3000;
app.use(require('express').static(__dirname + '/public'));

app.use(cors);

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("A new user has just connected");

    socket.on('disconnect', () => {
        console.log("A user has left");
    });

    socket.on('add-message', (message, username, flag) => {
        io.emit('message', {type: 'new-message', text: message, username: username, currentUser: flag})
    })
})

http.listen(nodePort, () => {
    console.log(`Server is running on port ${nodePort}`);
})