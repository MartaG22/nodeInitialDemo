const Room = require("../../models/dbRoom.js");

const getRooms = async () => {
      try {
            const currentRooms = await Room.find({});
            return { status: "success", currentRooms};  //! ENVÍO TODOS LOS DATOS DE TODAS LAS SALAS
      
      } catch (error) {
            return { status: "error", message: error.message }
      }
}

module.exports = getRooms;