const request = require('request');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({
    path: path.join(__dirname,'../.env')
})

getDeaths = (cb) => {
    url = 'https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/nakazeni-vyleceni-umrti-testy.json';

    request({url,json: true},(error,data) => {
        if(error){
            cb('Data se nepodařilo načíst.',undefined);
        }
        else{
            cb(undefined,data);
        }
    })
}
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

// getCorona((error,data) => {
//     if(error){
//         console.log(error);
//     }
//     else{
//         let date = new Date();
//         let year = date.getFullYear();
//         let month = date.getMonth()%12+1;
//         let day = parseInt(date.toString().substr(8,2))-1;

//         let today = `${year}-${month}-${day}`
//         let pocet;

//         pocet = data.filter(poc => {
//             return poc.datum == today;
//         })
//         console.log(today.toString(),pocet[0].pocetCelkem,pocet[0].datum);
//     }
// })

module.exports = {
                    getCorona,
                    getDeaths
                }