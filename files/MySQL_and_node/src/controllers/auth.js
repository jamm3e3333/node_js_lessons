const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.join(__dirname,'../utils/.env')
})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USE,
    database: process.env.DATABASE
});

const conn = db.connect((error, result) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
        }
});

exports.register = (req, res) => {
    console.log(req.body);
    const {name, email, password, passwordConf} = req.body;
    res.send({
        data: req.body
    })
}