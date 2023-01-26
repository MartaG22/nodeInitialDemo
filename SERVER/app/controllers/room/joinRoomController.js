const Room = require("../../models/dbRoom.js");
const Usuari = require('../../models/dbUsuari.js');


const joinRoom = async (room, usuari) => {
      // console.log("ROOM en joinROOM Controller", room);
      // console.log("USER en joinROOM Controller", usuari);
      
      try {
            // const currentUser = await Usuari.findOne({idUsuari: usuari.userId});
            // console.log('currentUser en joinROOM Controller', currentUser);
            const currentUser = usuari;
            console.log('currentUser en joinROOM Controller', currentUser);

            if (currentUser) {
                  const currentRoom = await Room.findOne({roomName: room});
                  const idCurrentUser = currentUser.userId;
                  console.log('idCurrentUser', idCurrentUser)
                  console.log('currentRoom en joinROOM Controller', currentRoom);
                  console.log('currentRoom.idUsuarisInThisRoom 1', currentRoom.idUsuarisInThisRoom)

                  // const updateUser = 
                  await currentRoom.updateOne({idUsuarisInThisRoom: {idUsuari: idCurrentUser, nomUsuari: currentUser.userName}})
                  console.log(currentRoom)
                  console.log(currentRoom.idUsuarisInThisRoom);

//! CREAR UN ARRAY de usuarios en la sala / HACER PUSH DEL USUARIO QUE SE UNE A LA SALA / Y ACTUALIZAR DIRECTAMENTE "IDUSUARISINTHISROOM" EN LA BASE DE DATOS:


                  // Cliente.updateOne({ _id: body._id }, {
                  //       $set: {
                  //           nombre: body.nombre,
                  //           apellidos: body.apellidos,
                  //           apodo: body.apodo,
                  //           estado: body.estado
                  //       }
                  //   },
                  // const updateUser = await Room.findOneAndUpdate(
                  //       {roomName: room}, 
                  //       {$set: {idUsuarisInThisRoom: [{idUsuari: currentUser.userId, nomUsuari: currentUser.userNam}]}}
                  //       );

                  // console.log('updateUser. 2', updateUser)
                  //       console.log(currentUser.userId)
                  // const idCurrentUser = currentUser.userId;
                  // console.log('idCurrentUser', idCurrentUser)
                  // if (currentRoom){
                  //       //! SUBE EL USUARIO A LA SALA PERO BORRA EL ANTEIROR &&& GRABA EL IDUSUARI Y EL _ID
                  //       const updateUser = await Room.currentRoom({idUsuarisInThisRoom: currentUser.userId})
                  //       // ({idUsuarisInThisRoom: [{idUsuari: currentUser.userId}]})
                  //       // const usersCurrentRoom = await currentRoom.updateOne({idUsuarisInThisRoom: usuari});
                  //       console.log('updateUser', updateUser)




                        return ({ status: "success", currentRoom });
                  // }
            } else {
                  return ({ status: "error", message: "No s'ha pogut entrar a la Sala"})
            }

            // if(enterRoom.status === 'success') {
            //       console.log({msg: 'enterRoom en SOCKETS', room, usuari});  //! comentario de OMAR
            //       const currentRoom = await Room.findOne({roomName: room});
            //       console.log('currentRoom en SOCKETS/JOINROOM', currentRoom)
            //       const usersCurrentRoom = await currentRoom.updateOne({idUsuarisInThisRoom: usuari});

            //       console.log(usersCurrentRoom.idUsuarisInThisRoom)
            // }


      } catch (error) {
            return { status: "error", message: error };
        }
}

module.exports = joinRoom;