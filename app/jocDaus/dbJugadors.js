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
// https://sebhastian.com/sequelize-foreign-key/   RELACIÓ ENTRE TAULES
//? https://www.youtube.com/watch?v=J8oLwY5114c     EXPLICA LAS DIFERENTES RELACIONES ENTRE TABLAS!!!

const express = require('express');
const app = express();

// const port = process.env.PORT || 3001;
const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise");



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Open the connection to MySQL server
// https://www.npmjs.com/package/mysql2#using-promise-wrapper 
async function connectionDB() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
        });

        // Run create database statement
        await connection.query(`CREATE DATABASE IF NOT EXISTS dbJugadors`), (err, results) => {
            console.log('Results:', results);
        }
    }
    catch (err) {
        console.log('Error:', err);   //SI NO SE PUEDE CREAR LA DB
    }
};

// connectionDB();



// try {
//     await connection.query(`CREATE DATABASE IF NOT EXISTS dbJugadors`, (err, results) => {
//         console.log('Results:', results);
//     }) .catch (err) 
//         console.log('Error:', err);   //SI NO SE PUEDE CREAR LA DB

// };



// // Open the connection to MySQL server
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
// });

// // Run create database statement
// connection.query(`CREATE DATABASE IF NOT EXISTS dbJugadors`, (err, results) => {
//     console.log('Results:', results);
//     console.log('Error:', err);   //SI NO SE PUEDE CREAR LA DB
// }
// );

// Run the Sequelize code to connect to the database 
const sequelize = new Sequelize("dbJugadors", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
});






// Close the connection
// connection.end();

sequelize.authenticate()
connectionDB()
    .then(() => {
        console.log("CONEXIÓN A LA BASE DE DATOS OK");
    })
    .catch(error => {
        console.log("EL ERROR DE CONEXIÓN ES: " + error);
    });





//  Definim model  'JUGADORS':
const dbJugadors = sequelize.define('Jugadors', {
    idJugador: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nomJugador: {
        type: Sequelize.STRING, allowNull: false,
        // validate: {
        //     notNull: {
        //         missatge: "Introdueix el teu nom:"
        //     }   // allowNull   =>   És el mateix de NOT NULL de SQL. Obliga a introduir un valor al camp.
        // }
    },
    tiradesJugador: { type: Sequelize.INTEGER, defaultValue: 0},
    // dataRegistre: { type: Sequelize.DATE }
    tiradesGuanyades: { type: Sequelize.INTEGER, defaultValue: 0},
    percentatgeExit: { type: Sequelize.INTEGER, defaultValue: 0}
});



const dbJugades = sequelize.define('Jugades', {
    idJugada: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    tiradaDau1: { type: Sequelize.INTEGER },
    tiradaDau2: { type: Sequelize.INTEGER },
    // partidaGuanyada: { type: Sequelize.INTEGER},
    partidaGuanyada: { type: Sequelize.BOOLEAN},
});


dbJugades.belongsTo(dbJugadors);   //Associació entre taules!
dbJugadors.hasMany(dbJugades);


sequelize.sync()

// console.log(dbjugadors[0]);

// Creating all the tables defined in DB


// app.listen(port, () => {
//     console.log(`API REST inicialitzant en http://localhost: ${port}`)
// });

module.exports = {dbJugadors, dbJugades};