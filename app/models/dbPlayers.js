const express = require('express');
const app = express();


const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise");



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

module.exports = dbJugadors;