const user = (req, res) => {
    try {
        res.send({ nomUsuari: `Marta Garijo`, edat: 48, url: 'http://localhost:3000/user' })
    } catch (error) {
        return res.status(400).json({ error });
    };
};

module.exports = user;


// 'use strict';


// routes:
// //http://localhost:3000/user

// const express = require('express');
// //create object router
// const router = express.Router();

// const getUser = require('../controllers/user.js');

// //endpoint to get user info
// router.get('/user', getUser);

// module.exports = router;