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
        // const quantitatJugadors = llistatOrdenat.length;
        llistatOrdenat.forEach((jugador) => {
            const idJugadorActual = jugador.idJugador;
            const percentatgeJugadorActual = jugador.percentatgeExit;
            if (
                idJugadorActual != jugadorGuanyador.idJugador &&
                percentatgeJugadorActual === jugadorGuanyador.percentatgeExit
            ) {
                console.log("OTRO JUGADOR" , jugador.nomJugador);
                // missatge += `GUANYADOR:  \n ID Jugador: ${jugador.idJugador} \n Nom Jugador: ${jugador.nomJugador} \n Percentatge d'èxit: ${jugador.percentatgeExit}% \n \n`;

                guanyador = {
                        "ID Jugador:": jugador.idJugador,
                        "Nom Jugador:": jugador.nomJugador,
                        "Quantitat de Tirades:": jugador.tiradesJugador,
                        "Percentatge d'èxit:": jugador.percentatgeExit,
                    
                };
                missatge.push(guanyador);

            }
        });

        /*
        // await Jugador.find().sort({
        //     percentatgeExit: -1
        // }).then((llistatOrdenat) => {
            console.log("LLISTAT:", llistatOrdenat)
            const guanyador = llistatOrdenat[0];
            console.log("MAX:", llistatOrdenat[0])
            missatge += `GUANYADOR:  \n ID Jugador: ${guanyador.idJugador} \n Nom Jugador: ${guanyador.nomJugador} \n Percentatge d'èxit: ${guanyador.percentatgeExit}% \n \n`


            // BUSQUEM EMPATS:
            const quantitatJugadors = llistatOrdenat.length;  
            llistatOrdenat.forEach(jugador => {
                const idJugadorActual = jugador.idJugador;
                const percentatgeJugadorActual = jugador.percentatgeExit
                if (idJugadorActual != guanyador.idJugador && percentatgeJugadorActual === guanyador.percentatgeExit){
                    console.log(jugador.nomJugador);
                    missatge += `GUANYADOR:  \n ID Jugador: ${jugador.idJugador} \n Nom Jugador: ${jugador.nomJugador} \n Percentatge d'èxit: ${jugador.percentatgeExit}% \n \n`
                }
            })

        });
*/
        console.log("guanyador:", missatge);
        res.status(200).json(missatge);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = mostrarGuanyador;
