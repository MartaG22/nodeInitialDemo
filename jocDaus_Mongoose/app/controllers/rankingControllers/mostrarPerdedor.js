const Jugador = require('../../models/dbJugador.js');
const Jugada = require('../../models/dbjugada.js');

const mostrarPerdedor = async (req, res) => {
    // retorna el jugador/a amb pitjor percentatge d’èxit.

    let missatge = [];
    try {

        const llistatOrdenat = await Jugador.find().sort({
            percentatgeExit: 1,
        });
        const jugadorPerdedor = llistatOrdenat[0];
        perdedor = {
                "ID Jugador:": jugadorPerdedor.idJugador,
                "Nom Jugador:": jugadorPerdedor.nomJugador,
                "Quantitat de Tirades:": jugadorPerdedor.tiradesJugador,
                "Percentatge d'èxit:": jugadorPerdedor.percentatgeExit,
        
        };

        missatge.push(perdedor);


        // BUSQUEM EMPATS:
        llistatOrdenat.forEach((jugador) => {
            const idJugadorActual = jugador.idJugador;
            const percentatgeJugadorActual = jugador.percentatgeExit;
            if (
                idJugadorActual != jugadorPerdedor.idJugador &&
                percentatgeJugadorActual === jugadorPerdedor.percentatgeExit
            ) {

                perdedor = {
                        "ID Jugador:": jugador.idJugador,
                        "Nom Jugador:": jugador.nomJugador,
                        "Quantitat de Tirades:": jugador.tiradesJugador,
                        "Percentatge d'èxit:": jugador.percentatgeExit,
                    
                };
                missatge.push(perdedor);

            }
        });


        res.status(200).json({"PERDEDOR": missatge});
    } catch (error) {
        res.status(400).json({error});
    };

};

module.exports = mostrarPerdedor;



