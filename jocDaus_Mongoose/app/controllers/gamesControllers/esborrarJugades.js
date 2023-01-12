const Jugador = require('../../models/dbJugador.js');
const Jugada = require('../../models/dbjugada.js');

const esborrarJugades = async (req, res) => {
    // elimina les tirades d'un jugador/a.

    const missatge = {};
    const id = req.params.id;

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
            const quantitatJugades = await Jugada.count({ idJugador: idJugadorTrobat });
            await Jugada.deleteMany({ idJugador: idJugadorTrobat });

            const dadesJugador = {
                'ID Jugador:': idJugadorTrobat,
                'Nom Jugador:': dadesJugadorTrobat.nomJugador,
                "S'han esborrat amb èxit:": `${quantitatJugades} jugades d'aquest jugador`
            }
            
            res.status(200).json(dadesJugador)

        }
    } catch (error) {
        res.status(400).json(error);
    };
};

module.exports = esborrarJugades;