'use strict';

// Afegir Mòduls de Node
const express = require('express');
const app = express();

// Asignar Port
const port = process.env.PORT || 3000;

app.use(express.json());        // Nivell 2 - Exercici 1
                        
// Importar Routes
const routes = require('./routes/index_routes.js')


app.use("/", routes)

app.use('*', (req, res)=>{
    res.status(404).json({
        title: '404',
        error: 'Page not found'
    });
  });

app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});



/* CORRECCIONES 4.1 – API-REST
Molt ben fet, Marta! Et comento algunes coses que s'han de revisar:
•	Ben fet amb el README amb les instruccions i la descripció dels endpoints  
•	Tens un parell de coses rares a l'estructura del projecte: tens dos README i dos package.json. Hauries de sobreescriure els de fora de la carpeta app en comptes de crear-ne uns altres a dins
•	S'haurien de controlar les rutes no especificades perquè no retornin el HTML predeterminat de Express

TODO [x]  •	Tens un parell de coses rares a l'estructura del projecte: tens dos README i dos package.json. Hauries de sobreescriure els de fora de la carpeta app en comptes de crear-ne uns altres a dins

TODO [x]  •	Al /user la direcció de la ruta està hardcoded, hauries d'agafar-la de les propietats de la request  

TODO [x]  •	El /upload està quasi bé, però falla al pujar un arxiu perquè no comprova si hi ha la carpeta on puja els arxius per crear-la si no existeix (has d'afegir la comprovació perquè git no puja carpetes buides)

TODO []  •	El /time no retorna 401 unauthorised, retorna 400! I no em dius enlloc quin és l'usuari bo per provar-ho, ho he hagut de buscar dins el codi (ojo amb això, que tens bodies a la col·lecció de postman que no uses i en aquest no està el correcte per provar-ho). Estaria bé especificar-ho al README també

TODO [x]  •	El /pokemon està bé, però has de controlar què passa quan la API contesta coses que no volem: si el numero es massa gran o no és un número, la API ens retorna Not Found. Hauries d'usar això per escriure un missatge d'error perquè retorni 400 i l'explicació de per què

Has fet molt bona feina però et falten molts detallets per polir. Dona-li canya i m'ho torno a mirar  
*/

//TODO  [x]   • Controlar las rutas no especificadas para que no retorne el html predeterminado del express