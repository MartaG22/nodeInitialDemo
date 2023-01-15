const sequelize = require('sequelize');
const Jugador = require('../../models/dbJugador.js');
const Jugada = require('../../models/dbjugada.js');

// app.get('/ranking', 

const llistarRanking = async (req, res) => {
    // Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.

    let missatge = [];
    let sumaPercentatges = 0;
    try {

        const llistatOrdenat =  await Jugador.find().sort({ percentatgeExit: -1})
        llistatOrdenat.forEach(jugador => {
            sumaPercentatges += jugador.percentatgeExit;
            // missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit}% \n \n`

            const dadesJugador = {
                "ID Jugador:": jugador.idJugador,
                "Nom Jugador:": jugador.nomJugador,
                "Percentatge d'èxit:": `${jugador.percentatgeExit} %`,
                // "TIRADES:": tirades
            };

            missatge.push(dadesJugador);
        }
        );


        const quantitatJugadors = await Jugador.count({});
        const percentatgeMig = sumaPercentatges / quantitatJugadors;

        missatge.push({"PERCENTATGE D'ÈXIT MIG DE TOTS ELS JUGADORS:": `${percentatgeMig} %`})

        console.log(missatge);
        res.status(200).json(missatge);
    } catch (error) {
        res.status(400).send(error);
    };

};

module.exports = llistarRanking;
