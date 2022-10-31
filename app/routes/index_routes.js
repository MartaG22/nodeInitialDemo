// Importar Controllers
const crearJugadorController = require('../controllers/playersControllers/createPlayer.js');
const modificarJugadorController = require('../controllers/playersControllers/renamePlayer.js');
const llistarJugadorsController = require('../controllers/playersControllers/listPlayers.js');

const express = require('express');
const app = express();
const router = express.Router();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // const bodyParser = require('body-parser');


const cors = require('cors');
const dbJugadors = require('../models/dbJugadors.js');


// const players = require('./players_routes.js');
// const games = require('./games_routes.js');
// const ranking = require('./ranking_routes.js');





router.post('/players', crearJugadorController);
router.put('/players/:id', modificarJugadorController);
router.get('/players', llistarJugadorsController);


module.exports = router;
