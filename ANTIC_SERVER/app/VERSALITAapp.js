
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const server = require('http').Server(app)

const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

const io = require('socket.io')(server, {
    cors: {
        origins: [`http://${CLIENT_HOST}:${CLIENT_PORT}`,
        `ws://${CLIENT_HOST}:${CLIENT_PORT}`]}
    });


// Connect to database
require('./utils/connectDB.js')();


// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));

//invalid route handling
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// Sockets
require('./sockets/sockets.js')(io);

PORT = process.env.API_PORT || 3000
server.listen(PORT, console.log(`Server listening on port ${PORT}`));