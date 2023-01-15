const { dbJugadors, dbJugades } = require('../../models/dbJoc.js');

const llistarJugador = async (req, res) => {
    // Retorna llitat dels jugadors

    let missatge = [];
    try {
        const llistatJugadors = await dbJugadors.findAll({})
        if (llistatJugadors.length == 0) {
            return res.status(200).json("Encara no hi ha jugadors enregistrats!");
        }


        llistatJugadors.forEach(
            jugador => {
                // missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} % \n \n`
                jugador = {
                    'ID Jugador:': jugador.idJugador,
                    'Nom Jugador:': jugador.nomJugador,
                    "Quantitat de Tirades:": jugador.tiradesJugador,
                    "Percentatge d'èxit:": `${jugador.percentatgeExit} %`
                };
    
                missatge.push(jugador)
    
            }
        );

        console.log(missatge);
        res.status(200).json(missatge);
    } catch (error) {
        res.status(400).json(error);
    };

};

module.exports = llistarJugador;
