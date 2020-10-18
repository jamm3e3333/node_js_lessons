
const key = 'pk.eyJ1IjoiamFtbTNlMzMzMyIsImEiOiJja2Y0YzRyMXowYm0wMnVvZjNxN3Bvajg4In0.-q0Nmdmzez03nvzDcxSreA';
const request = require('request');

const geocode = (address, callback) => {
    const url_geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;
    request({url: url_geo,json: true}, (error, {body}) => {
            if(error){
                callback('Connection interrupted!',undefined);
            }
            else if(!body.features.length){
                callback('The location doesn\'t exist!');
            }
            else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
    })    
}

module.exports = geocode;
