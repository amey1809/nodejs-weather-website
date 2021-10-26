const request = require('request')
// Return geocode using callback pattern
const geoCode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW1leWtzIiwiYSI6ImNrdjFwY2VteTA0MXEydm82eDQ5Z2RtYXAifQ.FECS1-dIgUpzDA5g5Wai1w&limit=1'

     request({url : geocodeUrl, json : true}, (error, response) => {    
        if(error){
           callback('Unexpected error, unable to connect..', undefined)
        }else if (response.body.features.length === 0){            
            callback('Unable to find location.', undefined)
        }else{            
            const goeLocation = {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                place : response.body.features[0].place_name
            }
            callback(undefined, goeLocation)
        }    
    })
}

module.exports = geoCode