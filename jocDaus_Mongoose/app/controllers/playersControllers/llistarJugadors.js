const Jugador = require('../../models/dbJugador.js');

const llistarJugadors = async (req, res) => {
    // Retorna llitat dels jugadors

    let missatge = [];
    try {
        const llistatJugadors = await Jugador.find({})
        if (llistatJugadors.length == 0) {
            return res.status(400).json({"Error:": "Encara no hi ha jugadors enregistrats!"});
        }
        
        llistatJugadors.forEach(jugador => {

            jugador = {
                'ID Jugador:': jugador.idJugador,
                'Nom Jugador:': jugador.nomJugador,
                "Quantitat de Tirades:": jugador.tiradesJugador,
                "Percentatge d'èxit:": jugador.percentatgeExit
            };

            missatge.push(jugador)
        }
        );
        console.log(missatge);
        res.status(200).json({"Jugadors:": missatge});
    } catch (error) {
        res.status(400).json({error});
    };

};

module.exports = llistarJugadors;
