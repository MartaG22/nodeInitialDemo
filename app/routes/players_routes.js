const express = require("express");
const router = express.Router();


const crearJugadorController = require('../controllers/playersControllers/createPlayer.js');
const modificarJugadorController = require('../controllers/playersControllers/renamePlayer.js');
const llistarJugadorsController = require('../controllers/playersControllers/listPlayers.js');


router.post('/players', crearJugadorController);
router.put('/players/:id', modificarJugadorController);
router.get('/players', llistarJugadorsController);

module.exports = router;
