const request = require('request');
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9obm5hdGgiLCJhIjoiY2t6eHBwYW1hMDN0cjJ2bzN2Z3J2d3d3NyJ9.RqtMXy2yu5gqM8tA2rm8JQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to access weather services!', undefined);
        } else if(body.error === 0) {
            callback('Unable to find matching location! Please try  a new search', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
           
            })
            
        }
    })
}

module.exports = geoCode;
