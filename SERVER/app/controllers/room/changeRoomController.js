const Room = require("../../models/dbRoom.js");
const Usuari = require("../../models/dbUsuari.js");

const changeRoom = async (room, usuari) => {
      try {
            const userFind = await Usuari.findOne({ nomUsuari: usuari.userName });
            
            if (userFind) {

                  const currentUser = {
                        idUsuari: usuari.userId,
                        nomUsuari: usuari.userName,
                  };
                  const findOldRoom = await Room.findOne({ roomName: userFind.room })
                  const findNewRoom = await Room.findOne({ roomName: room})

                  if ( findOldRoom) {
                        const usersInOldRoom = findOldRoom.usersInThisRoom;
                        const newUsersInOldRoom = usersInOldRoom.filter((user) => {
                              return user.idUsuari != currentUser.idUsuari
      
                        });
                        await findOldRoom.updateOne({
                              usersInThisRoom: newUsersInOldRoom,
                        });
                  };

                  const arrayUsersNewRoom = findNewRoom.usersInThisRoom;
                  arrayUsersNewRoom.push(currentUser);

                  await findNewRoom.updateOne({
                        usersInThisRoom: arrayUsersNewRoom,
                  });

                  await Usuari.findOneAndUpdate({ idUsuari: currentUser.idUsuari }, { room: room });
                  return { status: "success", findNewRoom };
            };

      } catch (error) {
            return { status: "error", message: error };
      }
};

module.exports = changeRoom;