"use client"

import React, { useMemo } from "react";
import { io } from 'socket.io-client'

const page = () => {   

const socket = useMemo(() => io('http://localhost:4000'), []);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data, id) => {
        console.log(data + id);
    });

    return (
        <div>
            <h1>Socket.io</h1>
        </div>
    )
}

export default page;