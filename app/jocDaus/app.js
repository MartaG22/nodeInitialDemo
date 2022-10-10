//! Entrega 4.2: Node REST + DB + JWT
//! Construirem una API que doni suport a un joc de daus ;)
//? https://github.com/StratocasterO/masterclasses-it-academy/blob/master/2022_06_28%20git%20%2B%20npm/git_npm.md   ===>>>>  PER CREAR LES BRANQUES DEL GITHUB

// Al joc de daus s’hi juga amb dos daus de sis cares:

// En cas que el resultat dels dos daus sigui 7 la partida es guanya, si no es perd.
// Per poder jugar al joc t’has de registrar com a jugador/a amb un nom. Un jugador/a pot veure un llistat de totes les tirades que ha fet i el seu percentatge d’èxit.
// Per poder realitzar una tirada, un usuari/ària s’ha de registrar amb un nom no repetit. Al ser creat, se li assigna un identificador únic i una data de registre.
// Si l’usuari/ària ho desitja, pot no afegir cap nom i es dirà “ANÒNIM”. Pot haver-hi més d’un jugador/a “ANÒNIM”.
// Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. A més, pot saber el percentatge d’èxit de les tirades que ha fet.
// No es pot eliminar una partida en concret, però sí que es pot eliminar tot el llistat de tirades d'un jugador/a. El software ha de permetre llistar tots els jugadors/es que hi ha al sistema, el percentatge d’èxit de cada jugador/a i el percentatge d’èxit mitjà de tots els jugadors/es en el sistema.
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

const Jugador = require("./jugadors.js");

let dau1
let dau2
let guanya = false;
let tirades = 0;

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
})();
// tiroDaus();
// console.log(guanya);




//? CONNECTEM LA BASE DE DADES MYSQL:
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






'use strict';

const express = require('express');
// const { Sequelize } = require("sequelize");
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3001;

const arrayJugadors = [];


app.post(/players/, (req, res) => {
    // Crear jugadors

    // Aquesta part ha d'anar a contollers!!
    let jugadorRegistrat = false;
    let quantitatJugadors = arrayJugadors.length;
    console.log("quantitat Jugadors:", quantitatJugadors)
    console.log("Introdueix el nom del nou Jugador:");
    console.log(req.body.nom);

    
    jugadorRegistrat = arrayJugadors.includes(req.body.nom) ? false : true;
    console.log(jugadorRegistrat)
    
    //TODO  Passar el IF a TRY-CATCH:
    if (jugadorRegistrat == false) {
        // const nomNouJugador = req.body.nom;
        const nouJugador = new Jugador(req.body.nom, quantitatJugadors);
        console.log(nouJugador);
        arrayJugadors.push(nouJugador);
        console.log(arrayJugadors);
        // return res.send.json;
        return res.status(200).send(`Dades rebudes: \n NOU JUGADOR: ${nouJugador.nomJugador} \n ID: ${nouJugador.idJugador} \n DATA REGISTRE: ${nouJugador.dataRegistre}`);

    } else {
        //TODO  No funciona la validació. Si existeix el jugador no dona l'error.

        res.status(400).end({
            succes: false,
            missatge: "Aquest jugador ja existeix!" 
        })

    };
});





app.put('/players/:id', (req, res) => {
    // Modifica el nom dels jugadors
});

app.get(/players/, (req, res) => {
    // Retorna llitat dels jugadors

    // llistaJugadors.findAll({attributes: ["nomJugador", "dataRegistre"]});
    // .then(jugadors => {
    //     const llistat = JSON.stringify(jugadors);
    //     console.log(llistat);
    // }).catch(error => {
    //     console.log(error);
    // })

});

app.post(`/games/:id`, (req, res) => {
    // Un jugador/a específic realitza una tirada.
});

app.delete(`/games/:id`, (req, res) => {
    // elimina les tirades d'un jugador/a.
});

app.get(`/games/:id`, (req, res) => {
    // Retorna el llistat de jugades per un jugador/a.
});

app.get(/ranking/, (req, res) => {
    // Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
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
