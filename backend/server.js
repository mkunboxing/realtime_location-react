// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 4000;

const cors = require('cors');
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendLocation', (location) => {
    console.log('Location received:', location);
    io.emit('newLocation', location);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
