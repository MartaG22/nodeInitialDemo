// Nivell 1 - Exercici 1
// TODO •	Al /user la direcció de la ruta està hardcoded, hauries d'agafar-la de les propietats de la request  

const url = require('url');
 
const user = (req, res) => {

    console.log("protocol:", req.url )
    // + "://" + req.headers.host + req.url)
    const userUrl = req.protocol + "://" + req.headers.host + req.url

    // console.log(req.url)
    // let userUrl= req.user.url;
    
    

    try {
        res.send({ nomUsuari: `Marta Garijo`, edat: 48, url: userUrl })
        // res.send({ nomUsuari: `Marta Garijo`, edat: 48, url: 'http://localhost:3000/user' })
    } catch (error) {
        return res.status(400).json({ error });
    };
};

module.exports = user;