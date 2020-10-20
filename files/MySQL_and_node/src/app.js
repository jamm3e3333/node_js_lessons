const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const db = require('./utils/dbSetUp.js');
const { copyFile } = require('fs');


const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;

db.conn(db.db);

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Jakub Vala'
    })
});

app.get('/login',(req, res) => {
    res.render('login',{
        title: 'Jakub Vala'
    });
});

app.get('/register', (req, res) => {
    res.render('register',{
        title: 'Jakub Vala'
    })
})

app.listen(port,() => {
    console.log(`Listening on port: ${port}`);
});