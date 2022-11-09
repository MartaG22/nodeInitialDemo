// https://www.youtube.com/watch?v=shxlkhJBhSc
// https://eldevsin.site/conexion-a-mongodb-nativamente-y-con-mongoose/
// https://www.youtube.com/watch?v=W64wprj8qr0

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/jocDaus')

const db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error', err)
})

db.once('open', function () {
  console.log('Connection to DB successful')
})


const jugador = new Schema(
  {
    idJugador: { type: Number },
    nomJugador: { type: String, trim: true },
    // jugada: {
    //   _$oid: {},   // TODO  falta hacer el ID con auto-increment
    //   idJugada: {type: Number},
    //   tiradaDau1: { type: Number, min: 1, max: 6 },
    //   tiradaDau2: { type: Number, min: 1, max: 6 },
    //   partidaGuanyada: { type: Boolean }
    // },
    tiradesJugador: { type: Number, default: 0 },
    tiradesGuanyades: { type: Number, default: 0 },
    percentatgeExit: { type: Number, default: 0 },
  },
  { timestamps: true },
  // { collection: 'jocDaus' }
);


// const Jugada = new Schema(
//   {
//     _$oid: {},   // TODO  falta hacer el ID con auto-increment
//     idJugada: { type: Number },
//     tiradaDau1: { type: Number, min: 1, max: 6 },
//     tiradaDau2: { type: Number, min: 1, max: 6 },
//     partidaGuanyada: { type: Boolean }
//   }
// );


module.exports = mongoose.model('Jugador', jugador);