// Nivell 1 - Exercici 1
// TODO •	Al /user la direcció de la ruta està hardcoded, hauries d'agafar-la de les propietats de la request  

const url = require('url');
 
const user = (req, res) => {

    console.log("protocol:", req.url )
    const userUrl = req.protocol + "://" + req.headers.host + req.url
    // req.protocol ==>>  http
    // req.headers.host ==>> localhost:3000
    // req.url  ==>> /user
    
    try {
        res.send({ nomUsuari: `Bart Simpson`, edat: 10, url: userUrl })
    } catch (error) {
        return res.status(400).json({ error });
    };
};

module.exports = user;