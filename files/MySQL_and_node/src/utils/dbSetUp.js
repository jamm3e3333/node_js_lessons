const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname,'./.env')
})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USE,
    database: process.env.DATABASE
});

const conn = (database) => {
    database.connect((error, result) => {
        if(error){
            console.log(error);
        }
        else{
            console.log('MySQL connected');
        }
    });
}


module.exports = {
    conn,
    db
};



