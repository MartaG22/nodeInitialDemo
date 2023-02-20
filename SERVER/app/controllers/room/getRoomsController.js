const Room = require("../../models/dbRoom.js");

const getRooms = async () => {
      try {
            const currentRooms = await Room.find({});
            return { status: "success", currentRooms};
      
      } catch (error) {
            return { status: "error", message: error.message }
      }
}

module.exports = getRooms;