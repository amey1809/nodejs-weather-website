const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    console.log(latitude +','+longitude)
    const url = 'http://api.weatherstack.com/current?access_key=134de323400efa75900a0bdf0adef041&query='+ latitude +','+ longitude +'&units=f'

// //const error_url = 'http://api.weatherstack.com/current?access_key=134de323400efa75900a0bdf0adef041&query=&units=f'
    request({url, json : true}, (error, {body}) => {  //respose object destructuring to {body}.  
   
        if(error){            
            callback('Unexpected error, unable to connect..', undefined)
        }else if (body.error){         
            callback('Unable to find location.', undefined)
        }else{
            const weatherForecast = {
                weather: body.current.weather_descriptions[0],
                temp : body.current.temperature,
                apprentTemp: body.current.feelslike,
                visibility : body.current.visibility
            }
            const result =  weatherForecast.weather +'. It is ' +  weatherForecast.temp
            + ' degrees out. But feels like '+  weatherForecast.apprentTemp +' degrees. Visibility is '+ weatherForecast.visibility+'.!'
            callback(undefined, result)
        }    
    })
}

module.exports = forecast