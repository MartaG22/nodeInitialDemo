const express = require('express');
const app = express();


const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise");


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


//  Definim model  'JUGADES':


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

module.exports = {dbJugadors, dbJugades};
