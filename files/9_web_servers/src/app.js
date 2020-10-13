const path = require('path');
const express = require('express');

const app = express();
const publicDirectory = path.join(__dirname,'../public');

app.listen(3000,() => {
    console.log('Server is up on port 3000.');
});

app.set('view engine','hbs');
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Jakub Vala'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        position: 'student',
        place: 'VSB-TUO'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        read: 'FAQ'
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

