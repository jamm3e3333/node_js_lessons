const geoKey = 'pk.eyJ1IjoiamFtbTNlMzMzMyIsImEiOiJja2Y0YzRyMXowYm0wMnVvZjNxN3Bvajg4In0.-q0Nmdmzez03nvzDcxSreA';
const request = require('request');

//const add = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Ostrava.json?access_token=pk.eyJ1IjoiamFtbTNlMzMzMyIsImEiOiJja2Y0YzRyMXowYm0wMnVvZjNxN3Bvajg4In0.-q0Nmdmzez03nvzDcxSreA&limit=1';

const geocode = (address, callback) => {
    const url_geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoKey}&limit=1`;
    request({url: url_geo,json: true}, (error, response) => {
            if(error){
                callback('Connection interrupted!',undefined);
            }
            else if(!response.body.features.length){
                callback('The loaction doesn\'t exist!');
            }
            else{
                callback(undefined,{
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
    })    
}

module.exports = geocode;