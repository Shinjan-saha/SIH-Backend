const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial attendance data to the client
  io.emit('initialAttendance', JSON.parse(localStorage.getItem('attendance')) || {});

  socket.on('updateAttendance', (data) => {
    // Update localStorage with the latest attendance data
    localStorage.setItem('attendance', JSON.stringify(data));
    // Broadcast the updated attendance to all connected clients
    io.emit('updatedAttendance', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
