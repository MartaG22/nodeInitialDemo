const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

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

const uploadMulter = multer({
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

module.exports = uploadMulter;