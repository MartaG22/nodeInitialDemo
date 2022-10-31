const {dbJugadors, dbJugades} = require('../../models/dbJoc');

// app.delete(`/games/:id`, 

const esborrarJugades = async (req, res) => {
    // elimina les tirades d'un jugador/a.

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

            await dadesJugadorTrobat.update({ tiradesJugador: 0,  tiradesGuanyades: 0, percentatgeExit: 0 } );
            // await dadesJugadorTrobat.update({ tiradesGuanyades: 0 });
            // await dadesJugadorTrobat.update({ percentatgeExit: 0 });
            const jugades = await dbJugades.destroy({ where: { JugadorIdJugador: idJugadorTrobat } });
            // const jugades = await dbJugades.delete({ where: ( {JugadorIdJugador: idJugadorTrobat} and {partidaGuanyada: true})} });
            console.log(jugades);
            // const incialitzarJugades = await juadorAModificar.update({ tiradesJugador: 0 });


            const dadesJugador = `ID Jugador: ${idJugadorTrobat}  \nNom Jugador: ${dadesJugadorTrobat.nomJugador} \n \n`;
            const missatge = `S'han esborrat amb èxit ${jugades} jugades del jugador amb ID ${idJugadorTrobat}`;
            res.status(200).send(dadesJugador + missatge);

        }
    } catch (error) {
        res.status(400).send(error);
    };
};

module.exports = esborrarJugades;