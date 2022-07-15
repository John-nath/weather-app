const request = require('request');

const forecast = (lat, long, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=c1d4542a756e38ebe57dc9a99e6f78c4&query='+ long + ',' + lat +'&unit=m';
    
    request({url, json: true}, (error, {body} )=> {
        if(error) {
            callback('Unable to access weather services', undefined)
        } else if(body.error) {
            callback('Unable to find coordinates', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is '+body.current.temperature + ' degrees but it feels '+ body.current.feelslike + ' degrees out.');
        }

    })
    

}

module.exports = forecast;