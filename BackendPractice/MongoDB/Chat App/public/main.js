const socket = io('http://localhost:8080');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const usernameField = document.getElementById('username');
const messageField = document.getElementById('message');

function addMessage(msg) {
    console.log(`Message from: ${msg.username}`);
    chatMessages.innerHTML += `<div>${msg.username}: ${msg.message}</div>`;
}

/* Event listeners */

chatForm.addEventListener('submit', event => {
    let username = usernameField.value;
    let message = messageField.value;
    messageField.value = '';

    socket.emit('chat_message', {username: username, message: message});

    event.preventDefault();
});

/* Socket */

socket.on('message', msg => {
    addMessage(msg);
});