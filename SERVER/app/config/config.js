const config = require('dotenv');
config();

console.log(process.env.MONGODB.URI);