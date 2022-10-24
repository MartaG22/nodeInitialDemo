//! ---*  <  NIVELL 1  ><  Exercici 1  > *--- 
// Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i l'URL des d'on es fa la petició.


'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/user', (req, res) => {
    res.send({ nomUsuari: `Marta Garijo`, edat: 48, url: 'http://localhost:3000/user' })
});





//! ---* <  NIVELL 1  ><  Exercici 2  > *--- 
// Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif,
// amb una petició POST i que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.


const multer = require('multer');
const path = require('path');


// File upload folder
// Aquí cb se refiere a la devolución de llamada, y es un método integrado de Multer.
// Luego, declaramos el filename método dentro del motor diskStorage . Este método devuelve el nombre  del archivo cargado en la carpeta de destino.

const dir = './public/uploads';
const uploadImatge = multer({ dest: 'public/uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);   //! AQUÍ SE LE DA EL NOMBRE CON EL QUE SE SUBE  ((cambiarlo y ponerlo bien))
        console.log(file.originalname);
        cb(null, fileName);
    }
});


// MIDDLEWARE
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        let extensioArxiu = path.extname(file.originalname);

        if (extensioArxiu == '.png' || extensioArxiu == '.jpg' || extensioArxiu == '.gif') {
            return cb(null, true);

        } else {
            console.log("Extensió no permesa");
            req.fileValidationError = "Extensió no permesa";
            return cb(null, false, req.fileValidationError);
        };
    }
});


app.post('/upload', upload.single('imatge'), (req, res, next) => {
    console.log(req.file)

    if (req.fileValidationError) {
        console.log("Error: " + req.fileValidationError);
        return res.status(400).json({ error: req.fileValidationError });

    } else if (!req.file) {
        console.log("No s'ha pujat cap arxiu!");
        return res.status(400).json({ error: "No s'ha pujat cap arxiu!" });

    } else {
        return res.status(200).send({ success: `L'arxiu s'ha carregat correctament: ${req.file.originalname}` });
    };

});





//! ---* <  NIVELL 2  ><  Exercici 1  > *---
// Crea un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari/ària
// i retorni un objecte JSON que contingui l'hora i data actual.
// Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache.
// Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, sigui mitjançant Express o mitjançant un altre middleware.


var cors = require('cors')


app.use(cors());
app.use(express.json());
app.use(cors());


const allowlist = ['http://example1.com', 'http://example2.com'];

const corsOptions = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
};


app.post('/time', cors(corsOptions), (req, res) => {
    console.log(req.body.nom);
    const usuariCorrecte = "Omar";
    const nomUsuari = req.body.nom;
    console.log("nomusuari", nomUsuari);

    if (usuariCorrecte === nomUsuari) {
        let dataActual = new Date;
        res.set('Cache-control', 'no cache').json({
            suceso: true,
            missatge: "Usuari correcte!",
            usuari: nomUsuari,
            data: `${dataActual.getDate()}/${dataActual.getMonth() + 1}/${dataActual.getFullYear()}`,
            hora: `${dataActual.getHours()}:${String(dataActual.getMinutes()).padStart(2, '0')}`
        });
        return res.send.json;
        
    } else {
        res.status(400).json({
            suceso: false,
            missatge: "Usuari incorrecte"
        })
    }
});



//! ---* <  NIVELL 3  ><  Exercici 1  > *---
// Crea una petició GET a l'endpoint /pokemon/{id} que rebi un número de Pokémon, faci una cerca al Pokémon API i retorni el nom del Pokémon, la seva alçada i el seu pes.
// ->Pokeapi

// https://www.youtube.com/watch?v=9v5JVA0JVew      ===> Consulta a la pokeapi por nombre o por id de pokemon
// https://www.youtube.com/watch?v=ydcm7GECaAI
// https://attacomsian.com/blog/http-requests-axios   AXIOS!!!
// https://www.youtube.com/watch?v=G-j5SI7Qitk
// https://www.npmjs.com/package/node-fetch#installation



const fetch = require('cross-fetch');


app.get(("/pokemon/:id/"), async (req, res) => {
    const id = req.params.id;
    console.log(id);
const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        try {
          const pokemonTrobat = await fetch(url);
          
          if (res.status >= 400) {
            throw new Error("Aquest POKEMON no està enregistrat!");
          }
          
          const pokemon = await pokemonTrobat.json();
        
          const dadesPokemon = {"ID Pokemon": id, "nom Pokemon": pokemon.name, "alçada Pokemon": pokemon.height, "pes Pokemon": pokemon.weight};
          console.log(dadesPokemon);
          res.status(200).send(dadesPokemon);

        } catch (error) {
          return res.status(400).json({ error });
        };
});




app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
