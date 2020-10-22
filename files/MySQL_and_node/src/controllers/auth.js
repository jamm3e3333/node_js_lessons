const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    db.query('SELECT email FROM users WHERE email = ?',[email], async (error, result) => {
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            return res.render('register',{
                message: 'That email is already in use.',
                title: 'Jakub Vala'
            });
        }
        else if(password !== passwordConf){
            return res.render('register',{
                message: 'Password doesn\'t match.',
                title: 'Jakub Vala'
            });
        }

        let hashedPassword = await (bcrypt.hash(password, 8))
        db.query('INSERT users SET ?', {name: name, email: email, password: hashedPassword}, (error, result) => {
            if(error){
                console.log(error);
            }
            else{
                return res.render('register', {
                    message: 'User registered.',
                    title: 'Jakub Vala'
                })
            }
        });
        
    });
    
}