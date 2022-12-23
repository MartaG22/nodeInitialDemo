// bcript y hash para guardar la CONTRASEÑA ENCRIPTADA!!!

// el TOKEN se puede guardar en la base de datos (y podría haber varios uruarios con el mismo nombre)
// Si no se guarda en la base de datos,  tiene que combrobar que sea usuario único


const Usuari = require('../../models/dbUsuari.js')
const jwt = require('jsonwebtoken');
console.log(Usuari);

const loginUser = async (req, res) => {
      const userName = req.body;
      console.log(userName);
}

module.exports = loginUser;