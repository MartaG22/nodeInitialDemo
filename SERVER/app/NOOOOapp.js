require("dotenv").config();

const express = require('express');
const app = express();
const Server = require('socket.io');
const http = require("http").Server(app);
const Sockets = require('./sockets/socket.js');
const cors = require('cors');

const myDB = require("./models/DB.js");
const PORT = process.env.PORT || 3000;

// Import and connect to database
myDB();
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log(`Server on http://localhost:${PORT}`);

const io = new Server(httpServer);

Sockets(io);