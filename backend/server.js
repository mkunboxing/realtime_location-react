// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 4000;

app.use(cors({
  origin: "https://realtime-location-beta.vercel.app/"
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
