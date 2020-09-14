const request = require('request');
const url = 'http://api.weatherstack.com/current?access_key=ee1f407f492625b5e74f4c638bb1eed0&query=37.8267,-122.4233';

request({url: url, json: true}, (error, response) => {
    const location = response.body.location;
    const weather = response.body.current;
    console.log(`${weather.weather_descriptions[0]} \nCity: ${location.name} \nCurrent temperature: ${weather.temperature} °C\nFeels like: ${weather.feelslike} °C`);
})

const APIkey = 'ee1f407f492625b5e74f4c638bb1eed0';
