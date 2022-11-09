// app.post('/players', 

// const {dbJugadors, dbJugades} = require('../../models/dbJoc_Mongoose.js');
const Jugador = require('../../models/dbJoc_Mongoose.js');

// app.get('/players', 
const llistarJugadors = async (req, res) => {
    // Retorna llitat dels jugadors

    let missatge = "";
    try {
        const llistatJugadors = await Jugador.find({ })
        
        // console.log("llistat", llistatJugadors);
        // console.log("llistat jugadors:", llistatJugadors);

        llistatJugadors.forEach(jugador => {
            // TODO  Falta añadir el ID del jugador
            missatge += `\nID Jugador:  ${jugador.idJugador}  \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} % \n \n`
            // missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} % \n \n`
        });
        console.log(missatge);
        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };

};

module.exports = llistarJugadors;
