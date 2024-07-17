// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://realtime-location-beta.vercel.app/", // Allow your frontend URL
    methods: ["GET", "POST"]
  }
});

const port = 4000;

// Use cors middleware
app.use(cors({
  origin: "http://localhost:3000" // Allow your frontend URL
}));

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
