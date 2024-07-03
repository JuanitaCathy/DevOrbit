const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();

const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST']
  }

})

io.on('connection', () => {
  console.log('User connected');
});

io.on('connection', (socket) => {
  io.emit('message', 'Hello world', socket.id);
});

server.listen(4000, () => {
  console.log('Server is running on port',4000);
});