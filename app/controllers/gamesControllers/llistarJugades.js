const {dbJugadors, dbJugades} = require('../../models/dbJoc');

// app.get(`/games/:id`, 

const llistarJugades =  async (req, res) => {
    // Retorna el llistat de jugades per un jugador/a.
    // Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. 
    // A més, pot saber el percentatge d’èxit de les tirades que ha fet.

    // console.log("Introdueix el ID d'un Jugador:");
    // console.log("jugador", req.params.id);
    const id = req.params.id;
    // console.log(id);

    try {
        const dadesJugadorTrobat = await dbJugadors.findOne({ where: { idJugador: id } });   // Validació per trobar si existeix un jugador amb el nom introduit
        console.log('***dadesJugadorTrobat:***', dadesJugadorTrobat);

        if (dadesJugadorTrobat == null) {
            console.log("El valor de l'ID introduit no existeix!");
            res.status(400).json({ Error: "Aquest jugador no existeix!" });

        } else {
            const idJugadorTrobat = dadesJugadorTrobat.idJugador;
            console.log('***idJugadorTrobat:***', idJugadorTrobat);
            // const jugadesTotalsJugadorTrobat = dadesJugadorTrobat.tiradesJugador;   // TODO NECESITO AQUESTA DADA PER EXTREURE EL PERCENTATGE!
            // console.log('***jugadesTotalsJugadorTrobat:***', jugadesTotalsJugadorTrobat);
            // console.log("id Jugador Trobat:", idJugadorTrobat);
            console.log("jugador Trobat:", dadesJugadorTrobat.nomJugador);
            // console.log("jugades Totals Jugador Trobat:", jugadesTotalsJugadorTrobat);


            const jugades = await dbJugades.findAll({ where: { JugadorIdJugador: idJugadorTrobat } });
            // console.log("jugades", jugades);
            const dadesJugador = `ID Jugador: ${idJugadorTrobat}  \nNom Jugador: ${dadesJugadorTrobat.nomJugador} \n`;
            let missatgePercentatge = `Percentatge d'èxit: ${dadesJugadorTrobat.percentatgeExit}% \n \n`
            //! let percentatgeExit = (dadesJugadorTrobat.tiradesGuanyades * 100)/dadesJugadorTrobat.tiradesJugador;
            //! // await dbJugadors
            let missatgeTirades = "";
            // let missatgePercentatge = "";
            for (let i = 0; i < jugades.length; i++) {
                let jugadaActual = jugades[i];
                // console.log(jugadaActual);

                // if (jugadaActual.partidaGuanyada === true) {
                //     percentatgeExit= ++percentatgeExit;
                // }
                // console.log('percentatgeExit', percentatgeExit)
                missatgeTirades += `TIRADA  ${i + 1}: \n Dau 1: ${jugadaActual.tiradaDau1} \n Dau 2: ${jugadaActual.tiradaDau2} \n Partida guanyada: ${jugadaActual.partidaGuanyada}  \n \n`;

            };

            res.status(200).send(dadesJugador + missatgePercentatge + missatgeTirades);
        };
    } catch (error) {
        res.status(400).send(error);
    };
};

module.exports = llistarJugades;
