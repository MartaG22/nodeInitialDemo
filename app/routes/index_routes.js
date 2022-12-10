const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = express.Router();
const authUser = require ('../middlewares/authUser.js')

// Importar Controladors
const userController = require('../controllers/userController.js');
const uploadController = require('../controllers/uploadController.js');
const timeController = require('../controllers/timeController.js');
const pokemonController = require ('../controllers/pokemonController.js');

// Importar Middlewares
const uploadMulter = require('../middlewares/uploadMiddleware.js');      // Nivell 1 - Exercici 2

// Afegir Routes
router.get('/user', userController);
router.post('/upload', uploadMulter.single('imatge'), uploadController);
router.post('/time', [cors(), authUser], timeController); 
router.get('/pokemon/:id', pokemonController);


module.exports = router;