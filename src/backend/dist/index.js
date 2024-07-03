"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST']
    }
});
io.on('connection', () => {
    console.log('User connected');
});
io.on('connection', (socket) => {
    io.emit('message', 'Hello world', socket.id);
});
server.listen(4000, () => {
    console.log('Server is running on port', 4000);
});
