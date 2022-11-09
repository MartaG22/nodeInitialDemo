const Jugador = require('../../models/dbJoc_Mongoose.js');
const Jugada = require('../../models/dbjugada.js');

// app.delete(`/games/:id`, 

const esborrarJugades = async (req, res) => {
    // elimina les tirades d'un jugador/a.

    // console.log("Introdueix el ID d'un Jugador:");
    // console.log("jugador", req.params.id);
    const id = req.params.id;
    // console.log(id);

    try {
        const dadesJugadorTrobat = await Jugador.findOne({ idJugador: id });   // Validació per trobar si existeix un jugador amb el nom introduit
        console.log('***dadesJugadorTrobat:***', dadesJugadorTrobat);

        if (dadesJugadorTrobat == null) {
            console.log("El valor de l'ID introduit no existeix!");
            res.status(400).json({ Error: "Aquest jugador no existeix!" });

        } else {

            const idJugadorTrobat = dadesJugadorTrobat.idJugador;
            console.log('***idJugadorTrobat:***', idJugadorTrobat);

            await dadesJugadorTrobat.updateOne({ tiradesJugador: 0,  tiradesGuanyades: 0, percentatgeExit: 0 } );
            // await dadesJugadorTrobat.update({ tiradesGuanyades: 0 });
            // await dadesJugadorTrobat.update({ percentatgeExit: 0 });
            const quantitatJugades = await Jugada.count({ idJugador: idJugadorTrobat });
            await Jugada.deleteMany({ idJugador: idJugadorTrobat });
            // const jugades = await dbJugades.delete({ where: ( {JugadorIdJugador: idJugadorTrobat} and {partidaGuanyada: true})} });
            console.log(quantitatJugades);
            // const incialitzarJugades = await juadorAModificar.update({ tiradesJugador: 0 });


            const dadesJugador = `ID Jugador: ${idJugadorTrobat}  \nNom Jugador: ${dadesJugadorTrobat.nomJugador} \n \n`;
            const missatge = `S'han esborrat amb èxit ${quantitatJugades} jugades del jugador amb ID ${idJugadorTrobat}`;
            res.status(200).send(dadesJugador + missatge);

        }
    } catch (error) {
        res.status(400).send(error);
    };
};

module.exports = esborrarJugades;