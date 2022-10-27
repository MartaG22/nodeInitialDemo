const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = express.Router();

// Afegir Controladors
const userController = require('../controllers/userController.js');
const uploadController = require('../controllers/uploadController.js');
const timeController = require('../controllers/timeController.js');
const pokemonController = require ('../controllers/pokemonController.js');

// Afegir Middlewares
const uploadMulter = require('../middlewares/uploadMiddleware.js')
// const corsOptions = require('../middlewares/timeMiddleware.js')
// app.use(cors());                        // Nivell 2 - Exercici 1


router.get('/user', userController);
router.post('/upload', uploadMulter.single('imatge'), uploadController);
router.post('/time', cors(), timeController); 
router.get('/pokemon/:id', pokemonController);

// router.get( user);

// router.post('/upload', upload);

// router.post('/time', time);

// router.get('/pokemon/:id', pokemon);


module.exports = router;







// module.exports = {user, upload, time, pokemon};

// PARA SERPARAR LOS DADOS:
//? https://expressjs.com/es/guide/routing.html
// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });