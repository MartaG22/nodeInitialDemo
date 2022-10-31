const express = require('express');
const app = express();


const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise");



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

module.exports = dbJugades;