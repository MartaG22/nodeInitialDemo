const socket = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    query: {
        'token': sessionStorage.getItem('token')
    }
});

let socketConnected = false;
console.log('sessionStorage.token:', sessionStorage.token)
console.log('sessionStorage.token:', sessionStorage)



socket.on('connect', async () => {

    socket.on('newRoom', (newRoomName) => {
        showRoom(newRoomName);
    })

    await socket.emit("getRooms");



    socket.on('joinNewRoom',  async (room, usersInThisRoom, currentUser) => {

        console.log("HHHHHHHHHHHHOOOOOOOOOOOOLLLLLLLLLLAAAAAAAA");
        // console.log(room, usersInThisRoom, currentUser)
        
        console.log("Han arribat aquestes dades a CLIENT/JOINNEWROOM:", room, usersInThisRoom, currentUser);

        await showUsers(room, usersInThisRoom, currentUser.userName);        
        
    });
    

    socket.on("joinRoom",  async (room, usersInThisRoom, currentUser, previousMessages) => {
        
        await showUsers(room, usersInThisRoom, currentUser.userName);
        await showMessages(previousMessages, currentUser, usersInThisRoom);

    })
        

    socket.on("updateUsersInRoom", (room, arrayUsers, usuari) => {
        showUsers(room, arrayUsers, usuari); //PONERLO BIEN
    })


    socket.on('sendMessage', (newMessage, usuari, room, arrayUsersInRoom) => {
        showNewMessage(newMessage, usuari, room);
    })

})