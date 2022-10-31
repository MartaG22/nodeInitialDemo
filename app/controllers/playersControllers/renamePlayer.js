const dbJugadors = require('../../models/dbJugadors.js');


// app.put ('/players/:id'

const modificarJugador = async (req, res) => {
    // Modifica el nom dels jugadors

    const id = req.params.id;

    try {
        const juadorAModificar = await dbJugadors.findOne({ where: { idJugador: id } });   // Validació per trobar si existeix un jugador amb el nom introduit
        console.log(juadorAModificar);
        const nouNomJugador = req.body.nomJugador;

        if (juadorAModificar == null) {
            try {
                console.log("El valor de 'juador a modificar' és " + juadorAModificar); // NULL
                res.status(400).json({ Error: "Aquest jugador no existeix!" });

            } catch (error) {
                res.status(400).send(error);
            };

        } else {
            try {
                const nomJugadorTrobat = juadorAModificar.nomJugador
                console.log('idJugador:', juadorAModificar.idJugador, 'nomJugadorTrobat:', nomJugadorTrobat)
                console.log('nouNomJugador:', nouNomJugador);

                const nomJugadorRepetit = await dbJugadors.findOne({ where: { nomJugador: nouNomJugador } });   // Validació per trobar si existeix un jugador amb el nom introduit
                console.log('nomJugadorRepetit:', nomJugadorRepetit);

                if (nomJugadorRepetit && nouNomJugador != "") {
                    console.log("Aquest jugador ja existeix. Introdueix un altre nom");
                    res.status(400).json({ "Error": "Aquest jugador ja existeix!  Introdueix un altre nom!" });

                } else if (nouNomJugador === "") {
                    const jugadorAnonim = await juadorAModificar.update({ nomJugador: "ANÒNIM" });
                    console.log("Jugador creat com a 'ANÒNIM'!");
                    res.status(200).json(`Jugador creat com a '${jugadorAnonim.nomJugador}'!`);

                } else {
                    await juadorAModificar.update({ nomJugador: nouNomJugador });
                    res.status(200).json(`Nom del jugador modificat amb èxit.  Nou nom:  ${juadorAModificar.nomJugador}`);

                };

            } catch (error) {
                res.status(400).send(error);
            };
        };
    } catch (error) {
        res.status(400).send(error);
    };
};

module.exports = modificarJugador;
