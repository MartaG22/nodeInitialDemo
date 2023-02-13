const jwt = require("jsonwebtoken");
const disconnectUser = require("../controllers/user/logoutUserController.js");

const initFirstRoom = require("../controllers/room/initRoom.js");
const createRoom = require("../controllers/room/newRoomController.js");
const getRooms = require("../controllers/room/getRoomsController.js");
const joinRoom = require("../controllers/room/joinRoomController.js");
const getUsersRoom = require("../controllers/user/getUsersController.js")
const sendMessage = require("../controllers/message/sendMessageController.js")


const sockets = async (io) => {
    io.use(function (socket, next) {

        if (socket.handshake.query && socket.handshake.query.token) {

            jwt.verify(
                socket.handshake.query.token,
                process.env.ACCESS_TOKEN_KEY,
                function (error, decoded) {
                    if (error) return next(new Error("Authentication error"));
                    socket.decoded = decoded;
                    next();
                }
            );
        } else {
            throw new Error("Authenticatoin error");
        }
    });



    io.on("connection", async (socket) => {

        const usuari = {
            userId: socket.decoded.idUsuari,
            userName: socket.decoded.nomUsuari,
        };

        // Inicialitzem la Primera Sala (PANGEA)
        initFirstRoom();

        socket.on("joinRoom", async (room) => {
            try {

                let enterRoom = await joinRoom(room, usuari);

                if (enterRoom.status === "success") {
                    const arrayUsersInRoom = [];
                    enterRoom.currentRoom.usersInThisRoom.forEach((user) => {
                        arrayUsersInRoom.push(user.nomUsuari);
                    });

                    const previousMessages = enterRoom.currentRoom.message;
                    io.emit("joinNewRoom", room, arrayUsersInRoom, usuari, previousMessages);

                } else {
                    //! <<<***>>>   FALTA ACABAR AQUEST CONTROLOADOR  !!!!   no funciona
                    // console.log("Aquest USUARI ja està connectat a aquesta ROOM")
                    // return { status: "error", message: "Aquest USUARI ja està connectat a aquesta ROOM" };


                };
            } catch (error) {
                return { status: "error", message: error };
            };
        });



        socket.on("newRoom", async (newRoomName) => {
            try {
                let createNewRoom = await createRoom({ newRoomName });

                if (createNewRoom.status === "success") {

                    let usersInThisRoom = await getUsers(createNewRoom);
                    console.log("usersInThisRoom", usersInThisRoom);

                    io.emit("getRooms", createNewRoom); // FALTARIA AFEGIR ELS USUARIS i acabar el controller!!!
                };
            } catch (error) {
                return { status: "error", message: error };
            };
        });



        socket.on("getRooms", async () => {
            // initRoom();
            try {
                let currentCreatedRooms = await getRooms();

                let countRooms = currentCreatedRooms.currentRooms.length;
                let arrayCurrentRooms = [];

                if (currentCreatedRooms.status === "success") {
                    for (let i = 0; i < countRooms; i++) {
                        let roomName =
                            currentCreatedRooms.currentRooms[i].roomName;
                            arrayCurrentRooms.push(roomName);
                    }

                    io.to(socket.id).emit("newRoom", arrayCurrentRooms);
                } else {
                    io.to(socket.id).emit("error", currentCreatedRooms.error);
                }
            } catch (error) {
                return { status: "error", message: error };
            }
        });


        socket.on('newMessage', async (newMessage, room) => {
            console.log({msg: "dades rebudes a SOCKETS/NEWMESSAGE:", newMessage, room});

            try {
                const sendNewMessage = await sendMessage(newMessage, usuari, room.roomName);

                if (sendNewMessage) {
                    const arrayUsersInRoom = await getUsersRoom(room.roomName);
                    io.emit("sendMessage", sendNewMessage, usuari, room.roomName, arrayUsersInRoom);

                };                

            } catch (error) {
                return { status: "error", message: error };
            };            
        });







        socket.on("disconnect", async () => {
            try {
                let getUsersRoom = await disconnectUser(usuari);

                if (getUsersRoom.status === "success") {
                        io.emit("updateUsersInRoom", getUsersRoom.currentRoom, getUsersRoom.newArrayUsers,  usuari.userName);

                    } else {
                        return {status: "error", message: "No s'ha detectat la desconnexió del client"}
                    }
                        
            } catch (error){
                result = { status: "error", message: error.message }
            }
        });
    });
};

module.exports = sockets;
