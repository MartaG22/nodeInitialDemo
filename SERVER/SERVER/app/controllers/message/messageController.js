const Room = require("../../models/dbRoom.js");

const sendMessage = async (newMessage, currentUser) => {
      // SERVER
      console.log('newMessageUser', newMessage);
      console.log({msg: newMessage, currentUser})

      await Room.updateOne({newMessage})

      //! FALTA LA ROOM PARA SUBIR EL MENSAJE A LA BASE DE DATOS!
      console.log(Room)

};

module.exports = sendMessage;