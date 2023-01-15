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
        // const quantitatJugadors = llistatOrdenat.length;
        llistatOrdenat.forEach((jugador) => {
            const idJugadorActual = jugador.idJugador;
            const percentatgeJugadorActual = jugador.percentatgeExit;
            if (
                idJugadorActual != jugadorPerdedor.idJugador &&
                percentatgeJugadorActual === jugadorPerdedor.percentatgeExit
            ) {
                // console.log("OTRO JUGADOR" , jugador.nomJugador);
                // missatge += `GUANYADOR:  \n ID Jugador: ${jugador.idJugador} \n Nom Jugador: ${jugador.nomJugador} \n Percentatge d'èxit: ${jugador.percentatgeExit}% \n \n`;

                perdedor = {
                        "ID Jugador:": jugador.idJugador,
                        "Nom Jugador:": jugador.nomJugador,
                        "Quantitat de Tirades:": jugador.tiradesJugador,
                        "Percentatge d'èxit:": jugador.percentatgeExit,
                    
                };
                missatge.push(perdedor);

            }
        });


        // await Jugador.find().sort({
        //     percentatgeExit: 1
        // }).then((llistatOrdenat) => {
        //     const perdedor = llistatOrdenat[0];
        //     console.log("MIN:", llistatOrdenat[0]);
        //     missatge += `PERDEDOR:  \n ID Jugador: ${perdedor.idJugador} \n Nom Jugador: ${perdedor.nomJugador} \n Percentatge d'èxit: ${perdedor.percentatgeExit}% \n \n`


        //     const quantitatJugadors = llistatOrdenat.length;  // BUSQUEM EMPATS:
        //     llistatOrdenat.forEach(jugador => {
        //         const idJugadorActual = jugador.idJugador;
        //         const percentatgeJugadorActual = jugador.percentatgeExit;
        //         if (idJugadorActual != perdedor.idJugador && percentatgeJugadorActual === perdedor.percentatgeExit) {
        //             console.log(jugador.nomJugador);
        //             missatge += `PERDEDOR:  \n ID Jugador: ${jugador.idJugador} \n Nom Jugador: ${jugador.nomJugador} \n Percentatge d'èxit: ${jugador.percentatgeExit}% \n \n`

        //         }
        //     });

        // });

        res.status(200).json(missatge);
    } catch (error) {
        res.status(400).json(error);
    };

};

module.exports = mostrarPerdedor;



