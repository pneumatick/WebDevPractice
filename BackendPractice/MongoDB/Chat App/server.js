const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const server = http.Server(app);
const PORT = process.env.PORT || 8080;
const socketio = require('socket.io')(server);
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* Express */

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

/* HTTP server */

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Socket open on port ${PORT}`);
});

/* Socket */

socketio.on('connection', socket => {
    console.log('User connected...');
    socket.emit('message', {username: 'Server', message: 'Welcome to the chat!'});

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat_message', msg => {
        socketio.emit('message', msg);
    });
});