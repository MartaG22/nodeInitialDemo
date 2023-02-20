const socket = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    query: {
        'token': sessionStorage.getItem('token')
    }
});

let socketConnected = false;

socket.on('connect', async () => {

    socket.on('newRoom', (newRoomName) => {
        showRoom(newRoomName);
    })

    await socket.emit("getRooms");

    socket.on('showRooms', (arrayCurrentRooms) => {
        showRoom(arrayCurrentRooms);
    });

    socket.on('newDataMessage', (message) => {
        showDataMessage(message);
    })

    socket.on('userNewRoom', (room, arrayUsersInRoom, usuari) => {
        showNewRoom(room);
        showUsers(room, arrayUsersInRoom, usuari.userName);
        showUserNewRoom(room, usuari);
    });

    socket.on("joinRoom", async (room, usersInThisRoom, currentUser, previousMessages) => {
        showUsers(room, usersInThisRoom, currentUser);
        await showMessages(room, previousMessages, currentUser, usersInThisRoom);
    })

    socket.on("updateUsersInRoom", (room, arrayUsers, usuari) => {
        showUsers(room, arrayUsers, usuari); 
    })

    socket.on('sendMessage', async (newMessage, usuari, room, arrayUsersInRoom) => {
        await showNewMessage(newMessage, usuari, room);
    })

})