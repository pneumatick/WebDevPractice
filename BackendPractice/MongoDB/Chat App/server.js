const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const server = http.Server(app);
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const Msg = require('./models/messages');
const { mongoDBUser, mongoDBPass } = require('./sensitive.js');
const mongoDB = `mongodb+srv://${mongoDBUser}:${mongoDBPass}@cluster0.0o509hm.mongodb.net/chat-message-database?retryWrites=true&w=majority`;
mongoose.connect(mongoDB).then(() => {
    console.log('Connected to MongoDB');
});
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
    Msg.find().then(messages => {
        socket.emit('past-messages', messages);
    });
    console.log('User connected...');
    //socket.emit('message', 'Server: Welcome to the chat!');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat_message', msg => {
        const message = new Msg({msg});
        message.save().then(() => {
            socketio.emit('message', msg);
        });
    });
});