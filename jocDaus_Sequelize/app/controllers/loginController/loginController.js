const express = require("express");
const app = express();

//!  PARA CREAR EL JSON WEB TOKEN:
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/login", (req, res) => {
    let username = req.body.user;
    let password = req.body.password;
    console.log("username:", username, "///   password:", password);
    if (username !== "Omar" || password !== "IT-Academy") {
        // verificar si existe en nuestra base de datos de usuarios
        res.status(401).send({
            error: "usuario o contraseña inválidos",
        });
        return;
    };
    
    let tokenData = {
        username: username,
    };

    let token = jwt.sign(tokenData, "Secret Password", {
        expiresIn: 60 * 60 * 24, // Expira en 24 horas.
    });

    console.log(token); //!  CREO QUE LO TENEMOS QUE GUARDAR EN LA BASE DE DATOS
    res.send({
        token,
    });
});


//!  PARA AUTENTICARNOS MEDIANTE TOKENS:
app.get("/secure", (req, res) => {
    let token = req.headers["authorization"];
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación",
        });
        return;
    };

    token = token.replace("Bearer ", "");

    jwt.verify(token, "Secret Password", function (err, user) {
        if (err) {
            res.status(401).send({
                error: "Token inválido",
            });
        } else {
            console.log(" TE HAS AUTENTICADO!!! \n TOMA YAAA!!!!");
            res.send({ message: "TE HAS AUTENTICADO!!!    TOMA YAAA!!!!" });
        };
    });
});
