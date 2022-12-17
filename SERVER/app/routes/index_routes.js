const express = require('express');
const app = express();
const routes = express.Router();

// const dbUsuaris = require('../models/dbUsuari.js');
// const dbRooms = require('../models/dbRoom');

const registerUser = require('../controllers/createRoomController.js')
const loginUser = require('../controllers/user/loginUserController.js');
const createRoom = require('../controllers/createRoomController.js');


routes.post('/newRoom', createRoom);

module.exports = routes