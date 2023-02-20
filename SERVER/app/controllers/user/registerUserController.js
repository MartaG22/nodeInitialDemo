// bcript y hash para guardar la CONTRASEÑA ENCRIPTADA!!!

// el TOKEN se puede guardar en la base de datos (y podría haber varios uruarios con el mismo nombre)
// Si no se guarda en la base de datos,  tiene que combrobar que sea usuario único

const Usuari = require("../../models/dbUsuari.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
      try {
            const user = await req.body;

            // Comprovem si s'han introduit les dades requerides
            if (!user.userName && !user.password) {
                  return res.status(400).send({ status: "fail", message: "Dades introduides no vàlides!!!" });
            } if (!user.userName) {
                  return res.status(400).send({ status: "fail", message: "No és vàlid el NOM D'USUARI" });
            } if (!user.password) {
                  return res.status(400).send({ status: "fail", message: "No és vàlida la contrasenya" })
            }

            // Comprovem si ja està enregistrat el nom introduit
            const userExists = await Usuari.find({nomUsuari: user.userName});
            if (userExists.length !== 0) {
                  return res.status(400).send({ status: "fail", message: "Aquest USUARI ja està enregistrat!"});

            } else {
                  const quantitatUsuaris = await Usuari.count({});

                  //Encriptació del PASSWORD i el guardem encriptat a la Base de Dades
                  const hashedPassword = await bcrypt.hash(user.password, 10);
                  await Usuari.create({
                        idUsuari: quantitatUsuaris +1,
                        nomUsuari: user.userName,
                        passwordUsuari: hashedPassword,
                  });

                  res.status(201).send({
                        status: "success",
                        message: `Usuari  <b>${user.userName}</b> enregistrat correctament`
                  });
            };

            // Es graba l'usuari a la base de dades!!!
      } catch (error) {
            res.status(500).json({ error });
      };
};

module.exports = userRegister;
