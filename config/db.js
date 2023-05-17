//const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://grupoflogo:appsflogo.com@visormapx.6lefs.mongodb.net/mapx?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;


// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {

//         // //host: process.env.DATABASE_HOST,
//         // host: "localhost",
//         // //schema:"test01",
//         // database:"Test-TCP-Client",        
//         // // dialect: process.env.DATABASE_DIALECT,
//         // dialect: "postgres",
//         // logging: false,
//         // //logging: true,
//         // username:"postgres",
//         // password:"adminadmin"
        

//     }

// )



//module.exports = sequelize;




