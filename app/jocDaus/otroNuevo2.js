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



// https://sebhastian.com/sequelize-create-database/
// https://www.tutorialspoint.com/creating-a-mysql-table-in-nodejs-using-sequelize

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require("mysql2");



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Open the connection to MySQL server
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
});

// Run create database statement
connection.query(`CREATE DATABASE IF NOT EXISTS dbJugadors`, (err, results) => {
    console.log('Results:', results);
    console.log('Error:', err);   //SI NO SE PUEDE CREAR LA DB
}
);

// Run the Sequelize code to connect to the database 
const sequelize = new Sequelize("dbJugadors", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
});



// const  Jugador = sequelize.define('dbJugadors', {
//     "id": {type: Sequelize.INTEGER, primaryKey: true},
//     "postre": Sequelize.STRING,
//     "calorias": Sequelize.INTEGER
// })


// module.exports = Jugador;

// Close the connection
// connection.end();

sequelize.authenticate()
    .then(() => {
        console.log("CONEXIÓN A LA BASE DE DATOS OK");
    })
    .catch(error => {
        console.log("EL ERROR DE CONEXIÓN ES: " + error);
    });





    //  Definim model:
const dbJugadors = sequelize.define('Jugadors', {
    idJugador: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nomJugador: Sequelize.STRING,
    dataRegistre: Sequelize.INTEGER
});


// console.log(dbjugadors[0]);

// Creating all the tables defined in DB
sequelize.sync();



app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
