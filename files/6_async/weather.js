const APIkey = '';
const request = require('request');


weather = (latitude,longitude, cb ) => {
    const url = `http://api.weatherstack.com/current?access_key=${APIkey}&query=${latitude},${longitude}`;
    request({url: url, json:true}, (error,response) => {
        if(error){
            cb('Connection interrupted',undefined);
        }
        else if(response.body.error){
            cb('The location doesn\'t exist!');
        }
        else{
            const w = response.body.current;
            const location = response.body.location;
            cb(undefined,`${w.weather_descriptions[0]} \nCity: ${location.name} \nCurrent temperature: ${w.temperature} °C\nFeels like: ${w.feelslike} °C`);
        }
    });
}

module.exports = weather;
