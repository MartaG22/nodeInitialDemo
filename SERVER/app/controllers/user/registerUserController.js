const Usuari = require('../../models/dbUsuari.js')
const jwt = require('jsonwebtoken');
console.log(Usuari);


const registerUser = async (req, res) => {
    try {
        const { nomUsuari, nickUsuari, passwordUsuari, emailUsuari} = req.body;
        
        // VALIDACIONS



    } catch (error) {
        res.status
    }
}