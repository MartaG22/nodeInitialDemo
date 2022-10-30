//! Entrega 4.2: Node REST + DB + JWT
//! Construirem una API que doni suport a un joc de daus ;)
//? https://github.com/StratocasterO/masterclasses-it-academy/blob/master/2022_06_28%20git%20%2B%20npm/git_npm.md   ===>>>>  PER CREAR LES BRANQUES DEL GITHUB

// Al joc de daus s’hi juga amb dos daus de sis cares:

// En cas que el resultat dels dos daus sigui 7 la partida es guanya, si no es perd.
// Per poder jugar al joc t’has de registrar com a jugador/a amb un nom. 
// Un jugador/a pot veure un llistat de totes les tirades que ha fet i el seu percentatge d’èxit.
// Per poder realitzar una tirada, un usuari/ària s’ha de registrar amb un nom no repetit.
// Al ser creat, se li assigna un identificador únic i una data de registre.
// Si l’usuari/ària ho desitja, pot no afegir cap nom i es dirà “ANÒNIM”. Pot haver-hi més d’un jugador/a “ANÒNIM”.
// Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. 
// A més, pot saber el percentatge d’èxit de les tirades que ha fet.
// No es pot eliminar una partida en concret, però sí que es pot eliminar tot el llistat de tirades d'un jugador/a. 
// El software ha de permetre llistar tots els jugadors/es que hi ha al sistema, el percentatge d’èxit de cada jugador/a i el percentatge d’èxit mitjà de tots els jugadors/es en el sistema.
// El software ha de respectar els principals patrons de disseny.
// Has de tenir en compte els següents detalls de construcció:
// POST /players: crea un jugador/a.
// PUT /players/{id}: modifica el nom del jugador/a.
// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
// POST /games/{id}: un jugador/a específic realitza una tirada.
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.

const db = require("./dbJugadors.js");

let dau1
let dau2
let resultatJugada = false;
let tirades = 0;


function tiroDaus() {
    let tiradaDau1 = parseInt(Math.random() * 6 + 1);
    let tiradaDau2 = parseInt(Math.random() * 6 + 1);
    console.log("DAU 1:", tiradaDau1);
    console.log("DAU 2:", tiradaDau2);
    // let resultat = false;

    ++tirades;
    let sumaDados = tiradaDau1 + tiradaDau2;
    console.log(sumaDados);
    if (sumaDados == 7) {
        resultatJugada = true;
    } else {
        resultatJugada = false;
    }
    console.log(tiradaDau1, tiradaDau2, resultatJugada);
    return ({ tiradaDau1, tiradaDau2, resultatJugada });
    // console.log(nombre)
    console.log(tirades);
};


/*  // TODO SI LA FUNCIÓ DE DALT FUNCIONA, S'HA D'ESBORRAR AQUESTA QUE SEGUEIX!!!
(function tiroDaus() {
    do {
        let tiradaDau1 = parseInt(Math.random() * 6 + 1);
        let tiradaDau2 = parseInt(Math.random() * 6 + 1);
        console.log("DAU 1:", tiradaDau1);
        console.log("DAU 2:", tiradaDau2);
        // let guanya = false;

        ++tirades;
        let sumaDados = tiradaDau1 + tiradaDau2;
        console.log(sumaDados);
        if (sumaDados == 7) {
            guanya = true;
        } else {
            guanya = false;
        }
        console.log(guanya);
        // console.log(nombre)
    } while (!guanya);
    console.log(tirades);
})(); */
// tiroDaus();
// console.log(guanya);




/* //? CONNECTEM LA BASE DE DADES MYSQL:
// https://www.youtube.com/watch?v=3xiIOgYdbiE
// https://morioh.com/p/c5b4a81d3da7

const Sequelize = require('sequelize');
const mysql = require('mysql2')
// const dbJugadors = sequalize
// const dbJugadors = require('./dbjugadors')




// TODO  Falta crear la base de dades   "dbJugadors"  si no existeix!!

// //create the sequelize instance, omitting the database-name arg
// const sequelize = new Sequelize("", "<db_user>", "<db_password>", {
//     dialect: "<dialect>"
//   });
  
//   return sequelize.query("CREATE DATABASE `<database_name>`;")
// //   .then(data 
// //   => {
// //     // code to run after successful creation.
// //   });






const sequelize = mysql.createConnection('dbJugadors', 'root', '1234', {
    host: 'localhost',
    database: 'dbJugadors',
    dialect: 'mysql'
    // storage: './database.dbJugadors.sql'
});
return sequelize.query("CREATE DATABASE `${dbJugadors}`;").then(data => {

})


// const llistat =  mysql.createConnection({host: 'localhost', user: 'root', password: '1234'});
// // llistat.query.CREATE DATABASE IF NOT EXIST dbJugadors )
// llistat.query('CREATE DATABASE IF NOT EXISTS database;');

//  Definim model:
 sequelize = dades.define('dbJugadors', {
    "idJugador" : {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    "nomJugador" : Sequelize.STRING,
    "dataRegistre": Sequelize.INTEGER
});


// const dbJugadors = llistaJugadors(sequalize, Sequelize);

dades.sync({force: false})
    .then(() => {
        console.log('Taules sincronitzades')
    })



dades.authenticate()
    .then(() => {
        console.log("S'HA CONNECTAT A LA BASE DE DADES CORRECTAMENT!!!");
    })
    .catch(error => {
        console.log(`NO S'HA POGUT CONNECTAR AMB LA BASE DE DADES. \nERROR: ${error}`);
    })
 */





'use strict';

const express = require('express');
const { dbJugadors, dbJugades } = require('./dbJugadors.js');
// const { Sequelize } = require("sequelize");
// const { regex } = require("uuidv4");
// // TODO Falta afegir base de dades de dbJugades!!!
// const { Sequelize } = require("sequelize");
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3000;

// const arrayJugadors = [];

//! dbJugadors.js   <>   Jugador

//! https://www.youtube.com/watch?v=CNZir1Jzry4   CONSULTAS A LA DATABASE
//! https://www.facebook.com/groups/node.es/permalink/1518867341655227/?comment_id=1519233714951923
//! https://maximorlov.com/6-common-sequelize-queries-rewritten-in-sql/  CONSULTAS BIEN EXPLICADO, COMPARANDO CONSULTA SEQUELIZE CON QUERIES MYSQL
//? https://tutorialmarkdown.com/sintaxis   -->  README
// https://www.youtube.com/watch?v=rUDn4ITQUFQ
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/



app.post('/players', async (req, res) => {
    // Crear jugadors

    //* ---- Aquesta part ha d'anar a contollers!!
    // let jugadorRegistrat = false;
    console.log("Introdueix el nom del nou Jugador:");
    console.log("jugador", req.body.nomJugador);
    const nom = req.body.nomJugador;
    console.log(nom)

    if (!nom || nom == 'ANÒNIM') {
        try {
            const jugadorAnonim = await dbJugadors.create({
                nomJugador: "ANÒNIM"
            });
            console.log("Jugador creat com a 'ANÒNIM'!");
            res.status(200).json(`Jugador creat com a '${jugadorAnonim.nomJugador}'!`);

        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        try {
            const jugador = await dbJugadors.findOne({ where: { nomJugador: nom } });   // Validació per trobar si existeix un jugador amb el nom introduit
            if (jugador) {
                console.log("Aquest jugador ja existeix")
                res.status(400).json({ "Error": "Aquest jugador ja existeix!" })
            } else {
                const jugador = await dbJugadors.create({
                    nomJugador: nom,
                });

                console.log("Jugador creat amb èxit")
                res.status(200).json(`S'ha creat el jugador: ${jugador.nomJugador}`);
            };

        } catch (error) {
            res.status(400).send(error);
        }
    }

});

app.put('/players/:id', async (req, res) => {
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
});

app.get('/players', async (req, res) => {
    // Retorna llitat dels jugadors

    let missatge = "";
    try {
        const llistatJugadors = await dbJugadors.findAll({})
        // const llistat = JSON.stringify(llistatJugadors);
        // console.log("llistat:", llistat);

        llistatJugadors.forEach(jugador => {
            missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} % \n \n`
            // console.log(missatge);
        });
        console.log(missatge)
        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };





    // dbJugadors.findAll({ attributes: ['nomJugador'] })
    //     .then(jugador => {
    //         const llistat = JSON.stringify(jugador);
    //         console.log("llistat:", llistat);
    //         res.send(llistat);
    //     }).catch(error => {
    //         console.log(error);
    //     })
});





app.post(`/games/:id`, async (req, res) => {
    // Un jugador/a específic realitza una tirada.

    console.log("Introdueix el ID d'un Jugador:");
    console.log("jugador", req.params.id);
    const id = req.params.id;
    console.log(id);
    try {
        const jugadorTrobat = await dbJugadors.findOne({ where: { idJugador: id } });   // Validació per trobar si existeix un jugador amb el nom introduit
        // console.log(idJugadorTirada, idJugadorTirada.nomJugador);

        if (!jugadorTrobat) {
            res.status(400).json({ Error: "Aquest jugador no existeix!" });

        } else {
            const tiradaDaus = tiroDaus();
            console.log('tiradaDaus', tiradaDaus); // devuelve array del return
            console.log(tiradaDaus.resultatJugada); // devuelve array del return

            console.log("nomjugador", jugadorTrobat.nomJugador);
            console.log("tirades jugador:", jugadorTrobat.tiradesJugador);

            // await jugadorTrobat.update({})

            // let percentatgeExit = 0;


            await dbJugades.create(
                {
                    tiradaDau1: tiradaDaus.tiradaDau1,
                    tiradaDau2: tiradaDaus.tiradaDau2,
                    partidaGuanyada: tiradaDaus.resultatJugada,
                    JugadorIdJugador: jugadorTrobat.idJugador
                }
            );

            const tiradesPerJugador = ++jugadorTrobat.tiradesJugador;
            await jugadorTrobat.update({ tiradesJugador: tiradesPerJugador });
            console.log("HOLAAA", jugadorTrobat);
            console.log("HOLAAAAAA", tiradaDaus);

            if (tiradaDaus.resultatJugada === true) {
                console.log(`El jugador ${jugadorTrobat.nomJugador} ha guanyat!`)
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
            console.log(percentatge)
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
});




// Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. 

app.delete(`/games/:id`, async (req, res) => {
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

            await dadesJugadorTrobat.update({ tiradesJugador: 0 });
            await dadesJugadorTrobat.update({ tiradesGuanyades: 0 });
            await dadesJugadorTrobat.update({ percentatgeExit: 0 });
            const jugades = await dbJugades.destroy({ where: { JugadorIdJugador: idJugadorTrobat } });
            // const jugades = await dbJugades.delete({ where: ( {JugadorIdJugador: idJugadorTrobat} and {partidaGuanyada: true})} });
            console.log(jugades);
            // const incialitzarJugades = await juadorAModificar.update({ tiradesJugador: 0 });


            const dadesJugador = `ID Jugador: ${idJugadorTrobat}  \nNom Jugador: ${dadesJugadorTrobat.nomJugador} \n \n`;
            const missatge = `S'han esborrat amb èxit totes les jugades del jugador amb ID ${idJugadorTrobat}`;
            res.status(200).send(dadesJugador + missatge);

        }
    } catch (error) {
        res.status(400).send(error);
    };
});


app.get(`/games/:id`, async (req, res) => {
    // Retorna el llistat de jugades per un jugador/a.
    //? Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. 
    // TODO A més, pot saber el percentatge d’èxit de les tirades que ha fet.

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
            const jugadesTotalsJugadorTrobat = dadesJugadorTrobat.tiradesJugador;   // TODO NECESITO AQUESTA DADA PER EXTREURE EL PERCENTATGE!
            console.log('***jugadesTotalsJugadorTrobat:***', jugadesTotalsJugadorTrobat);
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
});

app.get('/ranking', async (req, res) => {
    //TODO  falta ordenar por orden de éxitos
    //TODO  falta calcular percentatge d'exists mig de tots els jugadors

    // Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
    let missatge = "";
    try {
        const llistatJugadors = await dbJugadors.findAll({})
        // const llistat = JSON.stringify(llistatJugadors);
        // console.log("llistat:", llistat);

        llistatJugadors.forEach(jugador => {
            missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit} \n \n`
            console.log(missatge);
        });

        // for (let i=0; i<llistatJugadors.length; i++) {
        // const jugadaActual = llistatJugadors[i]
        //     missatge += `ID Jugador: ${jugadaActual.idJugador} \nNom Jugador: ${jugadaActual.nomJugador} \nPercentatge d'èxit: ${jugadaActual.percentatgeExit} \n \n`
        //     console.log(missatge)
        // };

        console.log(missatge)
        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };


    // array1.forEach(element => console.log(element));
});

app.get('/ranking/loser/', (req, res) => {
    // retorna el jugador/a amb pitjor percentatge d’èxit.
});

app.get('/ranking/winner/', (req, res) => {
    // retorna el jugador/a amb millor percentatge d’èxit.
});



app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
