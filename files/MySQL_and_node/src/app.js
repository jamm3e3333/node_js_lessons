const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;


app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express. static(publicDirectoryPath));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth.js'));

app.get('/login',(req, res) => {
    res.render('login',{
        title: 'Jakub Vala'
    });
});

app.listen(port,() => {
    console.log(`Listening on port: ${port}`);
});