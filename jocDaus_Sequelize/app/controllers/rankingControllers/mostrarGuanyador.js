const { dbJugadors, dbJugades } = require("../../models/dbJoc");

const mostrarGuanyador = async (req, res) => {
    // retorna el jugador/a amb millor percentatge d’èxit.

    let missatge = [];
    try {
        const maximaPuntuacio = await dbJugadors.max("percentatgeExit");
        const jugadorGuanyador = await dbJugadors.findAll({
            where: { percentatgeExit: maximaPuntuacio },
        });

        // console.log("maxima puntuacio:", maximaPuntuacio);
        console.log("guanyador:", jugadorGuanyador);
        console.log("guanyador:", jugadorGuanyador.length);

        // missatge += `GUANYADOR:  \n ID Jugador: ${guanyador.idJugador} \n Nom Jugador: ${guanyador.nomJugador} \n Percentatge d'èxit: ${guanyador.percentatgeExit}% \n \n`
        // console.log("guanyador:", missatge);
        jugadorGuanyador.forEach(jugador =>{

            guanyador = {
                "ID Jugador:": jugador.idJugador,
                "Nom Jugador:": jugador.nomJugador,
                "Quantitat de Tirades:": jugador.tiradesJugador,
                "Percentatge d'èxit:": jugador.percentatgeExit,
            };
            missatge.push(guanyador);
        })
            


              // BUSQUEM EMPATS:
        // const quantitatJugadors = llistatOrdenat.length;
        // llistatOrdenat.forEach((jugador) => {
        //     const idJugadorActual = jugador.idJugador;
        //     const percentatgeJugadorActual = jugador.percentatgeExit;
        //     if (
        //         idJugadorActual != jugadorGuanyador.idJugador &&
        //         percentatgeJugadorActual === jugadorGuanyador.percentatgeExit
        //     ) {
        //         console.log("OTRO JUGADOR" , jugador.nomJugador);
        //         // missatge += `GUANYADOR:  \n ID Jugador: ${jugador.idJugador} \n Nom Jugador: ${jugador.nomJugador} \n Percentatge d'èxit: ${jugador.percentatgeExit}% \n \n`;

        //         guanyador = {
        //                 "ID Jugador:": jugador.idJugador,
        //                 "Nom Jugador:": jugador.nomJugador,
        //                 "Quantitat de Tirades:": jugador.tiradesJugador,
        //                 "Percentatge d'èxit:": jugador.percentatgeExit,
                    
        //         };
        //         missatge.push(guanyador);

        //     }
        // });

        res.status(200).json(missatge);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = mostrarGuanyador;
