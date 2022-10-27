const express = require('express');
const app = express();

const cors = require('cors')


const allowlist = ['http://example1.com', 'http://example2.com'];

const corsOptions = (req, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(cors(corsOptions));
