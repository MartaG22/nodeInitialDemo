// se tiene que IMPORTAR SERVER!!

const SocketIO = require("socket.io");
const io = SocketIO.listen(server);

io.on("new-message", (data) => {
    // messages.push(data);
    console.log(data);

    const user = {
        //! V
        userId: socket.decoded.userId,  //data?
        userName: socket.decoded.userName,
    };

    console.log(`user ${user.userName} connected`);

    // io.sockets.emit("messages", messages);
});

module.exports = io;