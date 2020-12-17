const request = require('request');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({
    path: path.join(__dirname,'../.env')
})

getDeaths = (cb) => {
    url = 'https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/nakazeni-vyleceni-umrti-testy.json';

    request({url,json: true},(error,{body}) => {
        if(error){
            cb('Data se nepodařilo načíst.',undefined);
        }
        else{
            cb(undefined,body.data);
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

temp = '';

parserNum = (num) =>{
    num = num.toString();
    // if(num.length < 4){
    //     return num;
    // }
    let st ='';

    for(i = 0; i < num.length; i++){
        st = num[num.length -(1+i)] + st;
        if(((i+1)%3 == 0) && (i+1 != num.length)){
            st = ' ' + st;
        }
    }
    num = st;
    return num;
}


module.exports = {
                    getCorona,
                    getDeaths,
                    parserNum
                }