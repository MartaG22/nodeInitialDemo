const dbJugadors = require('../../models/dbJugadors.js');


// app.get('/players', 


const llistarJugadors = async (req, res) => {
    // Retorna llitat dels jugadors amb el seu percentatge d'èxit

    let missatge = "";
    try {
        const llistatJugadors = await dbJugadors.findAll({})
        // const llistat = JSON.stringify(llistatJugadors);
        // console.log("llistat:", llistat);

        llistatJugadors.forEach(jugador => {
            missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} % \n \n`
            // console.log(missatge);
        });
        console.log(missatge)
        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };

};

module.exports = llistarJugadors;
