const Jugador = require("../../models/dbJugador.js");
const Jugada = require("../../models/dbjugada.js");

const mostrarGuanyador = async (req, res) => {
    // retorna el jugador/a amb millor percentatge d’èxit.

    let missatge = [];
    // const guanyador = [];
    try {
        const llistatOrdenat = await Jugador.find().sort({
            percentatgeExit: -1,
        });
        const jugadorGuanyador = llistatOrdenat[0];
        guanyador = {
                "ID Jugador:": jugadorGuanyador.idJugador,
                "Nom Jugador:": jugadorGuanyador.nomJugador,
                "Quantitat de Tirades:": jugadorGuanyador.tiradesJugador,
                "Percentatge d'èxit:": jugadorGuanyador.percentatgeExit,
        
        };

        missatge.push(guanyador);

        // BUSQUEM EMPATS:
        llistatOrdenat.forEach((jugador) => {
            const idJugadorActual = jugador.idJugador;
            const percentatgeJugadorActual = jugador.percentatgeExit;
            if (
                idJugadorActual != jugadorGuanyador.idJugador &&
                percentatgeJugadorActual === jugadorGuanyador.percentatgeExit
            ) {
                console.log("OTRO JUGADOR" , jugador.nomJugador);

                guanyador = {
                        "ID Jugador:": jugador.idJugador,
                        "Nom Jugador:": jugador.nomJugador,
                        "Quantitat de Tirades:": jugador.tiradesJugador,
                        "Percentatge d'èxit:": jugador.percentatgeExit,
                    
                };
                missatge.push(guanyador);

            }
        });

        console.log("guanyador:", missatge);
        res.status(200).json({"GUANYADOR:": missatge});
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = mostrarGuanyador;
