// const server = require('../../app.js');

// const express = require ('express');
const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

// WEBSOCKETS

io.on('connection', (socket) => {

      // CONNEXIÓ!!!
      console.log(`New connection ${socket.id}`);

      socket.on('disconnect', () => {
            console.log("Un usuari s'ha desconnectat");
      });

      socket.on('new-message', (data) => {
            console.log(data);
            io.sockets.emit('new-message', data);
      })
})