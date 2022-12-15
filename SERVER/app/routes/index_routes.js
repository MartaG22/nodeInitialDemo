const express = require('express');
const app = express();
const routes = express.Router();

// const dbUsuaris = require('../models/dbUsuari.js');
// const dbRooms = require('../models/dbRoom');

const loginUser = require('../controllers/loginUserController.js');
const createRoom = require('../controllers/createRoomController.js');

routes.post('/newRoom', createRoom);