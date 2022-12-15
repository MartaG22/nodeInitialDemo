const mongoose = require('mongoose');

const sala = new mongoose.Schema(
      {
            roomName: String,
            message: [
                  {
                        sala: { },
                        usuari: { },
                        missatge: { },
                        time: { type: Date, default: Date.now },

                  },
            ],
      },
      { timestamps: true }
);

const Room = mongoose.model('Room', sala);

module.exports = Room;