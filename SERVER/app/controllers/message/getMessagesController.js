const Room = require("../../models/dbRoom.js");

const getPreviousMessages = async ( currentUser, room) => {
      try {
            
            const currentRoom = await Room.findOne({ roomName: room})            
            
            if (currentRoom) {
                  const getMessages = currentRoom.message;
                  return { status: "success", getMessages };
                  
            }
      } catch (error) {
            return { status: "error", message: error.message }
      }


};


module.exports = getPreviousMessages;