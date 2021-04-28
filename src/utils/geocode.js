const request = require('request');

module.exports = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxpc2FzdSIsImEiOiJja2tlN3piamkwaThkMm9xYnN6ZXN1cnB0In0.BQ18uPCHIxhPuEWDg5WXpw&limit=1'
    request({url: url, json: true}, (err, res) => {
        try {
            if (res.body.features.length > 0) {
                const lat = res.body.features[0].center[1];
                const long = res.body.features[0].center[0];
                const place_name = res.body.features[0].place_name;
                callback(undefined, {
                    latitude: lat,
                    longitude: long,
                    place_name
                })
            } else {
                callback('Unable to find location.', undefined)
            }
        } catch(err) {
            callback('Unable to connect to location services.', undefined)
        }
    })
}
