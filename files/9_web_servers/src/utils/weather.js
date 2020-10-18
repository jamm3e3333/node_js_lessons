const keys = 'ee1f407f492625b5e74f4c638bb1eed0';
const request = require('request');
const fs = require('fs');


weather = (latitude,longitude, cb ) => {
    const url = `http://api.weatherstack.com/current?access_key=${keys}&query=${latitude},${longitude}`;
    request({url, json:true}, (error,{body}) => {
        if(error){
            cb('Connection interrupted',undefined);
        }
        else if(body.error){
            cb('The location doesn\'t exist!');
        }
        else{
            const bodyJSON = JSON.stringify(body);
            fs.writeFileSync('weather.json',bodyJSON);
            cb(undefined,body);
        }
    });
}

module.exports = weather;
