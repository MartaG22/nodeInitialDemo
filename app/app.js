// console.log('Hello World');

//! https://www.youtube.com/watch?v=fG0p5WONxGg


'use strict';

// Afegir Mòduls de Node
const express = require('express');
const app = express();
// const multer = require('multer');       // Nivell 1  -  Exercici 2
// const path = require('path');

// const cors = require('cors')            // Nivell 2 - Exercici 1
// const fetch = require('cross-fetch');   // Nivell 3 - Exercici 1


// Asignar Port
const port = process.env.PORT || 3000;


// // Afegir Controladors
// const userController = require('./controllers/userController.js');
// const uploadController = require('./controllers/uploadController.js');
// const timeController = require('./controllers/timeController.js');
// const pogemonController = require('./controllers/pokemonController.js');

// // Afegir Middlewares
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());        // Nivell 2 - Exercici 1
                        



const routes = require('./routes/index_routes.js')

app.use("/", routes)

// app.get('/user', routes.userController);
// app.post('/upload', routes.uploadMulter.single('imatge'), routes.uploadController);
// app.post('/time', cors(), routes.timeController); 
// app.get('/pokemon/:id', routes.pokemonController);



app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
