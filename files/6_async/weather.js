const keys = require('./main.js');
const request = require('request');
const fs = require('fs');


weather = (latitude,longitude, cb ) => {
    const url = `http://api.weatherstack.com/current?access_key=${keys.weather}&query=${latitude},${longitude}`;
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
            cb(undefined,`${body.current.weather_descriptions[0]} \nCity: ${body.location.name} \nCurrent temperature: ${body.current.temperature} °C\nFeels like: ${body.current.feelslike} °C\nThe rain conditions are: ${body.current.weather_descriptions[0]}`);
        }
    });
}

module.exports = weather;