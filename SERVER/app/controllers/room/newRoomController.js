const Room = require("../../models/dbRoom.js");
const Usuari = require("../../models/dbUsuari.js");


const createRoom = async (newRoomName) => {

    try {

        const usersInCurrentRoom = [];
        const findRoom = await Room.findOne({ roomName: newRoomName.newRoomName });

        if (findRoom) {
            return { status: "error", message: "Ja existeix una sala amb aquest nom" };

        } else {

            const newRoom = await Room.create({ roomName: newRoomName.newRoomName });
            return {
                status: "success",
                newRoom
            };
        };

    } catch (error) {
        return { status: "error", message: error };
    };
};

module.exports = createRoom;
