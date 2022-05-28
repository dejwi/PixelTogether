require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000', `${process.env.FRONTEND_URL}`],
    },
});

io.on('connection', socket => {
    const roomId = socket.handshake.query.roomId;
   socket.join(roomId);
   io.to(roomId).emit('userChange', {count: io.sockets.adapter.rooms.get(roomId)?.size});

   socket.on('draw', data => {
      io.to(roomId).emit('draw', data);
   });

    socket.on("disconnect", () => {
        io.to(roomId).emit('userChange', {count: io.sockets.adapter.rooms.get(roomId)?.size || 0});
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
    console.log('Server listening on port 4000')
);