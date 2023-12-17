const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  io.emit('initialAttendance', {}); // localStorage is not available in server-side code

  socket.on('updateAttendance', (data) => {
    io.emit('updatedAttendance', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 3000; // Use the environment variable for port

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
