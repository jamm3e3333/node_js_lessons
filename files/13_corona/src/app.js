const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const covid = require('./utils/cases.js');

const port = process.env.PORT || 3000

const pathView = path.join(__dirname,'../templates/views');
const pathPartials = path.join(__dirname,'../templates/partials');
const pathPublic = path.join(__dirname,'../public');


app.set('view engine','hbs');
app.set('views',pathView);
hbs.registerPartials(pathPartials);

app.use(express.static(pathPublic));

app.get('',(req,res) => {
    covid.getStats((error,data) => {
        if(error){
            return res.send('error',{
                error: 'Error 404'
            })
        }
        
        today = `${data[data.length-1].datum.substr(8,2)}.${data[data.length-1].datum.substr(5,2)}.${data[data.length-1].datum.substr(0,4)}`;
        res.render('corona',{
            datum: today,
            pocet: covid.parserNum(data[data.length-1].pocetDen),
            celkem: covid.parserNum(data[data.length-1].pocetCelkem),
            name: 'Jakub Vala',
        });
        
    });
})

app.get('/deaths',(req,res) => {
    covid.getDeaths((error,data) => {
        if(error){
            return res.send('error',{
                error: 'Error 404'
            })
        }
        
        today = `${data[data.length-1].datum.substr(8,2)}.${data[data.length-1].datum.substr(5,2)}.${data[data.length-1].datum.substr(0,4)}`;

        res.render('deaths',{
            datum: today,
            pocet_nakazenych: covid.parserNum(data[data.length-1].kumulovany_pocet_nakazenych),
            pocet_vylecenych: covid.parserNum(data[data.length-1].kumulovany_pocet_vylecenych),
            pocet_umrti: covid.parserNum(data[data.length-1].kumulovany_pocet_umrti),
            pocet_testu: covid.parserNum(data[data.length-1].kumulovany_pocet_provedenych_testu),
            name: 'Jakub Vala'
        });
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Jakub Vala',
        company: 'mzcr'
    })
})

app.listen(port,() => {
    console.log(`The server is running on port ${port}.`);
})