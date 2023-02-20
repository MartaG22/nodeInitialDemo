const Usuari = require('../../models/dbUsuari.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const userLogin = async (req, res) => {

    try {
        const user = await req.body;
        const userFind = await Usuari.findOne({ nomUsuari: user.userName});

        const currentUser = {
            idUsuari: userFind.idUsuari,
            nomUsuari: userFind.nomUsuari,
            passwordUsuari: userFind.passwordUsuari,
            room: "Main"
        };
        
        const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_KEY)

        res.status(201).json({
            status: "success", 
            currentUser,
            accessToken
        });

        
    } catch {
        res.status(500).json({error: message});
    };
};

module.exports = userLogin;