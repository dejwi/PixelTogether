const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

io.on('connection', socket => {
    const roomId = socket.handshake.query.roomId;
   console.log('User connected on room: '+roomId);
   socket.join(roomId);

   socket.on('draw', data => {
      io.to(roomId).emit('draw', data);
   });
});

server.listen(4000, () =>
    console.log('Server listening on port 4000')
);