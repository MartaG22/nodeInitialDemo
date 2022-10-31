'use strict';

// const db = require("./dbJugadors.js");


const express = require('express');

const routes = require('./routes/index_routes.js');
const dbJugadors = require('./models/dbJugadors.js');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;


// // Open the connection to MySQL server
// // https://www.npmjs.com/package/mysql2#using-promise-wrapper 
// async function connectionDB() {
//     try {
//         const connection = await mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "1234",
//         });

//         // Run create database statement
//         await connection.query(`CREATE DATABASE IF NOT EXISTS dbJugadors`), (err, results) => {
//             console.log('Results:', results);
//         }
//     }
//     catch (err) {
//         console.log('Error:', err);   //SI NO SE PUEDE CREAR LA DB
//     }
// };

// const sequelize = new Sequelize("dbJugadors", "root", "1234", {
//     host: "localhost",
//     dialect: "mysql",
// });


// // Close the connection
// // connection.end();

// sequelize.authenticate()
// connectionDB()
//     .then(() => {
//         console.log("CONEXIÓN A LA BASE DE DATOS OK");
//     })
//     .catch(error => {
       
//         console.log("EL ERROR DE CONEXIÓN ES: " + error);
//     });


// const {dbJugadors, dbJugades} = require('./models/dbJugadors.js');
// const dbJugades = require('./models/dbGames.js');


app.use("/", routes)




app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});

