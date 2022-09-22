const socket = io('http://localhost:8080');
const chatMessages = document.getElementsByClassName('chat-messages');
const chatForm = document.getElementById('chat-form');
const usernameField = document.getElementById('username');
const messageField = document.getElementById('message');

chatForm.addEventListener('submit', event => {
    let username = usernameField.value;
    let message = messageField.value;

    socket.emit('chat_message', 'test');

    event.preventDefault();
});