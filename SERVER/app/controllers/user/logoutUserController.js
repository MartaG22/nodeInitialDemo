const Usuari = require('../../models/dbUsuari.js');
const Room = require('../../models/dbRoom.js');

const disconnectUser = async (usuari) => {
      try {
            const findUserInRoom = await Usuari.findOne({ idUsuari: usuari.userId });
            const currentRoom = findUserInRoom.room;
            let noRoom = null;
            const newArrayUsers = []

            if (findUserInRoom) {
                  await findUserInRoom.updateOne({ room: noRoom });
                  const findCurrentRoom = await Room.findOne({ roomName: currentRoom });

                  const arrayUsersInRoom = findCurrentRoom.usersInThisRoom;
                  const newUsersInRoom = arrayUsersInRoom.filter((user) => {
                        return user.idUsuari != findUserInRoom.idUsuari

                  });

                  newUsersInRoom.forEach(user => {
                        newArrayUsers.push(user.nomUsuari)
                  })

                  await findCurrentRoom.updateOne({ usersInThisRoom: newUsersInRoom });
                  return ({ status: "success", currentRoom, newArrayUsers });
            };

      } catch (error) {
            result = { status: "error", message: error.message }
      };

};

module.exports = disconnectUser;