const mongoose = require('mongoose');


const connectDB = () => {
      try {

            const db = `mongodb://${process.env.MONGOOSE_HOST}:${process.env.MONGOOSE_PORT}/${process.env.MONGOOSE_NAME}`;
            // await mongoose.connect(myDB, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.set('strictQuery', true);
            mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
            console.log(`Connected to ${process.env.MONGOOSE_NAME} DB`);

            // const myDB = `${process.env.DB_TYPE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
            // await mongoose.connect(myDB);
            // // await mongoose('mongodb://localhost/myDB');
            // const db = mongoose.connection;
            // db.on('error', function (error) {
            //       console.log('connection error', error)
            //     })
                
            //     db.once('open', function () {
            //       console.log(`Connection to DB ${process.env.DB_NAME} successful`);
            //     })
                
            // console.log('connect to DB');
      } catch (error) {
            console.error(error);
      };
};

module.exports = connectDB;

