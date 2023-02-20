const Room = require("../../models/dbRoom.js");

const getDataRoom = async (room) => {
      try {

            const currentRoom = await Room.findOne({ roomName: room });
                const arrayUsersInRoom = [];
                currentRoom.usersInThisRoom.forEach((user) => {
                    arrayUsersInRoom.push(user.nomUsuari);
                });

            //     const previousMessages = currentRoom.message;

            return { status: "success", currentRoom, arrayUsersInRoom};  
      
      } catch (error) {
            return { status: "error", message: error.message }
      }
}

module.exports = getDataRoom;