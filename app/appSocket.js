// https://www.youtube.com/watch?v=p-OevzBqHyQ


const express = require('express');
const app = express();
// const file = require('./CLIENTE/index.html')
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    // res.send('<h1> Aplicació de XAT <h1/>')
    // console.log(__dirname);
    res.sendFile(`${__dirname}/CLIENTE/index.html`)
})

server.listen(3000, () => {
    console.log('Servidor inicializado en http://localhost:3000')
});