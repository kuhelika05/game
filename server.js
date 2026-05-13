const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

let players = {};

io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    players[socket.id] = {
        id: socket.id,
        x: 0,
        y: 0,
        z: 0,
        level: 1,
        hp: 100,
        power: 10,
        name: 'Player'
    };

    socket.emit('currentPlayers', players);

    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('playerMovement', (movementData) => {
        if (players[socket.id]) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].z = movementData.z;

            io.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', {
            id: socket.id,
            message
        });
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected');
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
