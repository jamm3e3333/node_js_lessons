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
    covid.getCorona((error,data) => {
        if(error){
            return res.send({
                pocet: 'Error 404'
            })
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()%12+1;
        let day = parseInt(date.toString().substr(8,2))-1;

        let today = `${year}-${month}-${day}`
        let pocet;

        pocet = data.filter(poc => {
            return poc.datum == today;
        })
        res.render('corona',{
            datum: pocet[0].datum,
            pocet: pocet[0].pocetCelkem
        })
    });

    covid.getDeaths((error,data) => {
        if(error){
            return res.render('corona',{
                death: 'Error 404'
            })
        }
        let Date1 = new Date();
        
        res.render({
            
        })
    })
})

app.listen(port,() => {
    console.log(`The server is running on port ${port}.`);
})