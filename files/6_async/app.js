const APIkey = 'ee1f407f492625b5e74f4c638bb1eed0';
const geoKey = 'pk.eyJ1IjoiamFtbTNlMzMzMyIsImEiOiJja2Y0YzRyMXowYm0wMnVvZjNxN3Bvajg4In0.-q0Nmdmzez03nvzDcxSreA';
const request = require('request');
const url = `http://api.weatherstack.com/current?access_key=${APIkey}&query=37.8267,-122.4233`;

request({url: url, json: true}, (error, response) => {
    if(error){
        console.log('Unable connecting to the weather service!');
    }

    else if(response.body.error){
        console.log('Unable to find location!');
    }

    else{
        const location = response.body.location;
        const weather = response.body.current;
        console.log(`${weather.weather_descriptions[0]} \nCity: ${location.name} \nCurrent temperature: ${weather.temperature} °C\nFeels like: ${weather.feelslike} °C`);
    }
    
})



//Geocoding 
//Address -> lat/long -> weather
const url_geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${geoKey}&limit=1`;

request({url: url_geo, json: true},(error,response) => {
    const features = response.body.features[0];
    
    if(error){
        console.log('Connection interrupted.');
    }
    else if(!features.length){
        console.log('Error in the URL.');
    }
    else{
        const longitude = features.center[0];
        const latitude = features.center[1];
        console.log(`longitude: ${longitude}\nlattitude: ${latitude}`);
    }
    
    
})