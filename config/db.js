const mysql = require('mysql2');
require("dotenv").config();

const connectDB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,

});

connectDB.connect((err)=>{
    if(err){
        console.log("connection failed", err)
    }
    else{
        console.log("connected")
    }
})

module.exports =connectDB;


