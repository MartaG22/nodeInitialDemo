require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const http = require("http").Server(app);
const myDB = require('./models/DB.js');
const sockets = require("./sockets/sockets");
const routes = require("./routes/index_routes.js");
const PORT = process.env.PORT || 3000;


const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// Connect to database
myDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

// Sockets
sockets(io);

http.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`)
);








/*
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const connectDB = require("./database/connectDB");
const sockets = require("./sockets/sockets");
const routes = require("./routes/routes");


const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

// Sockets
sockets(io);

PORT = process.env.SERVER_PORT || 3000;
http.listen(
  PORT,
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
);
*/


// const express = require('express');
// const app = express();
// const server = require('http').Server(app);

// const cors = require('cors');
// const routes = require('./routes/index_routes.js');
// const db = require('./models/DB');

// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['my-custom-header'],
//     credentials: true,
//   }
// });

// require('./sockets/NOOsocket.js')(io);

// app.use(cors());

// app.set('port', process.env.PORT || 3000);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// server.listen(app.get('port'), () => {
//   console.log('Server listening in port :', app.get('port'));
// });
