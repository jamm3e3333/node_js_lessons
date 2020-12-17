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
    let mrtvy;
    let pocet;

    covid.getCorona((error,data) => {
        if(error){
            return res.send('error',{
                error: 'Error 404'
            })
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()%12+1;
        let day = parseInt(date.toString().substr(8,2))-1;

        let today = `${year}-${month}-${day}`
        

        pocet = data.filter(poc => {
            return poc.datum == today;
        });

        today = `${day}.${month}.${year}`
        
        res.render('corona',{
            datum: today,
            pocet: covid.parserNum(pocet[0].pocetCelkem)
        });
        
    });
})

app.get('/deaths',(req,res) => {
    covid.getDeaths((error,dataDeaths) => {
        if(error){
            return res.send('error',{
                error: 'Error 404'
            })
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()%12+1;
        let day = parseInt(date.toString().substr(8,2))-1;
    
        let today = `${year}-${month}-${day}`
        mrtvy = dataDeaths.filter(poc => {
            return poc.datum == today;
        });

        today = `${day}.${month}.${year}`

        res.render('deaths',{
            datum: today,
            pocet_nakazenych: covid.parserNum(mrtvy[0].kumulovany_pocet_nakazenych),
            pocet_vylecenych: covid.parserNum(mrtvy[0].kumulovany_pocet_vylecenych),
            pocet_umrti: covid.parserNum(mrtvy[0].kumulovany_pocet_umrti),
            pocet_testu: covid.parserNum(mrtvy[0].kumulovany_pocet_provedenych_testu)
        });
    });
})

app.listen(port,() => {
    console.log(`The server is running on port ${port}.`);
})