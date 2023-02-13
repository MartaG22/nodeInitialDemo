const Room = require("../../models/dbRoom.js");

const sendMessage = async (newMessage, currentUser, room) => {
      try {

            const currentRoom = await Room.findOne({ roomName: room });

            if (currentRoom) {
                  const previousMessages = currentRoom.message;
                  const newMessageData = { idUsuari: currentUser.userId, nomUsuari: currentUser.userName, missatge: newMessage };

                  previousMessages.push(newMessageData)
                  await currentRoom.updateOne({ message: previousMessages });

                  return newMessageData;

            };
      } catch (error) {
            return { status: "error", message: error.message }
      };      

};

module.exports = sendMessage;