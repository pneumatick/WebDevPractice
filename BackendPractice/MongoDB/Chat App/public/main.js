const socket = io('http://localhost:8080');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const usernameField = document.getElementById('username');
const messageField = document.getElementById('message');

function addMessage(msg) {
    chatMessages.innerHTML += `<div>${msg}</div>`;
}

/* Event listeners */

chatForm.addEventListener('submit', event => {
    let username = usernameField.value;
    let message = messageField.value;
    messageField.value = '';

    socket.emit('chat_message', `${username}: ${message}`);

    event.preventDefault();
});

/* Socket */

socket.on('message', msg => {
    addMessage(msg);
});

socket.on('past-messages', messages => {
    if (messages.length) {
        messages.forEach(message => {
            addMessage(message.msg);
        });
    }
});