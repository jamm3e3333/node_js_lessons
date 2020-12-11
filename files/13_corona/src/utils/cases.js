const request = require('request');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({
    path: path.join(__dirname,'../.env')
})

getCorona = (cb) =>{
    const url = 'https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/nakaza.json';
    request({url,json: true}, (error,{body}) => {
        if(error){
            cb('Data se nepodařilo načíst.',undefined)
        }
        else{
            cb(undefined,body.data);
        }
    })
}
getCorona((error,data) => {
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()%12+1;
        let day = date.toString().substr(8,2);
        let today = `${year}-${month}-${day}`
        data.forEach((e) =>{
            if(e.datum = today){
                console.log(e.pocetCelkem);
            }
        })
        console.log(today.toString());
    }
})
module.exports = getCorona