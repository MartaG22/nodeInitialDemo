// app.post(`/games/:id`, 

const tiroDaus = require('../../helpers/tiradaDaus');
// const dbJoc_Mongoose = require('../../models/dbJoc_Mongoose.js');
// const tiradaDaus = require('../../helpers/tiradaDaus');
// const {dbJugadors, dbJugades} = require('../../models/dbJoc');
const Jugador = require('../../models/dbJoc_Mongoose.js');
const Jugada = require('../../models/dbjugada.js');

// const tiradaDaus = require('../helpers/tiradaDaus.js');

const crearJugada = async (req, res) => {
    // Un jugador/a específic realitza una tirada.

    console.log("Introdueix el ID d'un Jugador:");
    console.log("jugador", req.params.id);
    const id = req.params.id;
    console.log(id);
    try {
        const jugadorTrobat = await Jugador.findOne({ idJugador: id });
        console.log("jugador Trobar:", jugadorTrobat)
        // const jugadorTrobat = await dbJugadors.findOne({ where: { idJugador: id } });   // Validació per trobar si existeix un jugador amb el nom introduit
        // console.log(idJugadorTirada, idJugadorTirada.nomJugador);

        if (!jugadorTrobat) {
            res.status(400).json({ Error: "Aquest jugador no existeix!" });

        } else {
            console.log("Holaaaaaaaaaaaaaaa")
            // const jugadesJugadorActual = await jugadorTrobat.count({jugada});
            // console.log('quantitatJugadesJugador:', jugadesJugadorActual);
        
            const tiradaDaus = tiroDaus();
            console.log('tiradaDaus', tiradaDaus); // devuelve array del return
            console.log(tiradaDaus.resultatJugada); // devuelve array del return

            console.log("nomjugador", jugadorTrobat.nomJugador);
            console.log("tirades jugador:", jugadorTrobat.tiradesJugador);
            // let jugadesJugadorActual = jugadorTrobat.tiradesJugador;

            // await jugadorTrobat.update({})

            // let percentatgeExit = 0;

            await Jugada.create(
                {
                        // idJugada: tiradesJugador +1,
                        tiradaDau1: tiradaDaus.tiradaDau1,
                        tiradaDau2: tiradaDaus.tiradaDau2,
                        partidaGuanyada: tiradaDaus.resultatJugada,
                        idJugador: jugadorTrobat.idJugador
                }
                );

            const tiradesPerJugador = ++jugadorTrobat.tiradesJugador;
            await jugadorTrobat.update({ tiradesJugador: tiradesPerJugador });
            console.log("HOLAAA", jugadorTrobat);
            console.log("HOLAAAAAA", tiradaDaus);

            if (tiradaDaus.resultatJugada === true) {
                console.log(`El jugador ${jugadorTrobat.nomJugador} ha guanyat la tirada!`)
                // console.log("<<<<GUANYADES>>>>", jugadorTrobat.tiradesGuanyades)
                await jugadorTrobat.update(
                    {
                        tiradesGuanyades: ++jugadorTrobat.tiradesGuanyades
                    }
                );
                console.log("tirades guanyades", jugadorTrobat.tiradesGuanyades)
                console.log("tirades tiradesPerJugador", jugadorTrobat.tiradesJugador)
                // console.log("tirades Guanyades", tiradesGuanyades);
                // console.log(guardarTirada)
                // console.log("Percentatge actualitzat")
            };
            // TODO  NO CALCULA BIEN EL PORCENTAJE. REVISARLO !!!!!!!!!!!!!!
            let percentatge = 0;
            percentatge = (jugadorTrobat.tiradesGuanyades * 100) / jugadorTrobat.tiradesJugador;
            console.log('percentatge', percentatge)
            await jugadorTrobat.update(
                {
                    percentatgeExit: percentatge
                }
            )

            const dadesJugador = `ID Jugador: ${jugadorTrobat.idJugador}  \nNom Jugador: ${jugadorTrobat.nomJugador} \n \n`;
            const missatge = ` DAU 1: ${tiradaDaus.tiradaDau1} \n DAU 2: ${tiradaDaus.tiradaDau2} \n Partida guanyada: ${tiradaDaus.resultatJugada}`;
            res.status(200).send(dadesJugador + missatge);

            // res.status(200).send(guardarTirada)
        };

    } catch (error) {
        res.status(400).send(error);
    };
};


module.exports = crearJugada;

