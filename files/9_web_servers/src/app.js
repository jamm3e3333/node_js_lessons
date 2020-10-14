const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//set up the local directory to serve
app.use(express.static(publicDirectory));

app.listen(3000,() => {
    console.log('Server is up on port 3000.');
});

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        place: 'VSB-TUO',
        name: 'Jakub Vala'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Weather app',
        place: 'VSB-TUO',
        name: 'Jakub Vala'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Weather app',
        place: 'VSB-TUO',
        read: 'FAQ',
        name: 'Jakub Vala'
    })
})

app.get('/weather', (req,res) => {
    res.send([{
        city: 'Opava',
        temp: 32,
        feelsLike: 33.2
    },{
        city: 'Ostrava',
        temp: 34,
        feelsLike: 34.5
    }]);
});
//app.com
//app.com/help
//app.com/about

