const request = require('request');

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c4eb7ef14630e1b623b8c8dcb8835658&query=' + encodeURIComponent(location.latitude) + ',' + encodeURIComponent(location.longitude) + '&units=f'
    request({url: url, json: true}, (err, res) => {
        try {
            if (res.body.current) {
                callback(undefined, `${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature} degrees out. It feels like ${res.body.current.feelslike} degrees out.`)
            } else {
                callback('Unable to retrieve weather data.', undefined)
            }
        } catch(err) {
            callback('Unable to connect to weather services.', undefined)
        }
    })

}

module.exports = forecast;