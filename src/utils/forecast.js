const request = require('request')


const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b731b39055fc363e68388b5b5697879d&query=' + longitude + ',' + latitude + '&units=m'
    
    request({url: url, json: true},(error,response) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if (response.body.error) {
            callback('Unable to find the location',undefined)
        }
        else {
            callback(undefined,`It is currently ${response.body.current.temperature} degrees out.It feels like ${response.body.current.feelslike} degress out.`)
        }
    })
}

module.exports = forecast

