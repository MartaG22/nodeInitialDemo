'use strict';

// Afegir Mòduls de Node
const express = require('express');
const app = express();

// Asignar Port
const port = process.env.PORT || 3000;

app.use(express.json());        // Nivell 2 - Exercici 1
                        
// Importar Routes
const routes = require('./routes/index_routes.js')


app.use("/", routes)


app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
