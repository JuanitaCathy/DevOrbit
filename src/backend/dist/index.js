"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = express();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });
    socket.on("sendMessage", (message, roomId) => {
        io.to(roomId).emit("receiveMessage", message);
        console.log(`Socket ${socket.id} sent message to room ${roomId}`);
    });
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
