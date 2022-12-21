// https://www.youtube.com/watch?v=p-OevzBqHyQ
// https://socket.io/get-started/chat
// https://ull-esit-dsi-1617.github.io/estudiar-las-rutas-en-expressjs-alejandro-raul-35l2/rutasexpressjs.html#using-middleware
// https://www.oscarblancarteblog.com/2018/01/16/implementar-json-web-tokens-nodejs/
// https://carlosazaustre.es/autenticacion-con-token-en-node-js
//! implementar jsonwebtoken en nodejs
// https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s    <<<>>>   https://github.com/xaviercomi/xat   (ejemplo)
// EJEMPLOS:
// https://github.com/JoanUniverse/QuePassaEh  (ejemplo)
// https://github.com/albert688/xat

//? de app.js =>> va a routes(registre i login(post)) ==>> després passa a CONTROLLERS (on està el registre i el login del USER)
//? a l'arxiu-carpeta de SOCKETS van els sockets de cada   EVENT  (el nom del socket en el front ha de coincidir amb el nom del BACK)

"use strict";
//! cors y fetch para coger los datos del FRONT!!!
// Carlos Herrera UDEMI
// Motivación en el trabajo

// https://www.youtube.com/watch?v=MYqpw0P31ms
//!CREAR EL SERVIDOR CON EL SOCKET 



require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require('cors');
const routes = require('./routes/index_routes.js');
const sockets = require("./sockets/socket.js");
const myDB = require("./models/DB.js");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

// Import and connect to database
myDB();
sockets(io);
app.use(cors());
app.use('/', routes);



// const routes = require('./routes/index_routes.js');

// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// Server(app); 
// const io = require("socket.io")(server); 


// sockets(io);
// io.on("chatMessage", (data) => {
//     // messages.push(data);
//     console.log(data);

//     // io.sockets.emit("messages", messages);
// });

// app.use('/', routes);

app.listen(PORT, () => {
    console.log("Servidor inicializado en http://localhost:3000");
});



// Server(app); 
// const io = require("socket.io")(server); 
// //Pondremos el servidor a escuchar en localhost con el puerto 8080 : server.24 sept 2015


// const SocketIO = require('socket.io');
// const io = SocketIO.listen(server);


/*
io.on('connection', (socket) => {
    // console.log('Un usuario se ha conectado');

    // socket.on('disconnect', () => {
    //     console.log('Un usuario se ha desconectado');
    // })

    // socket.on('chat', (missatge) => {
    //     console.log("Mensaje:" + missatge)
    // })

    socket.on("chat", (missatge) => {
        io.emit("chat", missatge)
    })


})

app.get('/', (req, res) => {
    // res.send('<h1> Aplicació de XAT <h1/>')
    // console.log(__dirname);
    res.sendFile(`${__dirname}/CLIENTE/index.html`)
})
*/
