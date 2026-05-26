const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('user-message', (data) => {
    socket.broadcast.emit('message', data);
});
socket.on('typing...', (username)=>{
    socket.broadcast.emit('typing...', username);
})
});

// Serve static frontend
app.use(express.static(path.resolve('./public')));
// Home route
app.get('/', (req, res) => {
    return res.sendFile(path.resolve('./public/index.html'));
});

// Dynamic PORT for Render
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});