const request = require('request');
const url = 'http://api.weatherstack.com/current?access_key=ee1f407f492625b5e74f4c638bb1eed0&query=37.8267,-122.4233';

request({url: url}, (error, response) => {
    // console.log(response);
    const data = JSON.parse(response.body);
    // console.log(data);
    console.log(data.current);
})

const APIkey = 'ee1f407f492625b5e74f4c638bb1eed0';
