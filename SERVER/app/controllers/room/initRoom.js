const Room = require('../../models/dbRoom.js');

// Inicialitzem una ROOM per començar!
const initFirstRoom = async () => {
      let firstRoom = "Main"
      const findRoom = await Room.findOne({ roomName: firstRoom });

      if (!findRoom) {
            await Room.create({ roomName: firstRoom });
      };
};

module.exports = initFirstRoom;