const socket = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    query: {
        'token': sessionStorage.getItem('token')
    }
});

let socketConnected = false;


socket.on('connect', () => {

    socket.on('newRoom', (newRoomName) => {
        showRoom(newRoomName);
    });
    
    
    socket.emit("getRooms");
    
    
    socket.on('joinNewRoom', async(room, usersInThisRoom, currentUser, previousMessages) => {      
        showUsers(room, usersInThisRoom, currentUser.userName);
        showMessages(previousMessages, currentUser, usersInThisRoom);
    });

    socket.on("updateUsersInRoom", (room, arrayUsers, usuari) => {
        showUsers(room, arrayUsers, usuari); //PONERLO BIEN
    });


    socket.on('sendMessage', (newMessage, usuari, room, arrayUsersInRoom) => {
        showNewMessage(newMessage, usuari, room);
    });

} );