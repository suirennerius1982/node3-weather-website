const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c18e921822266316d03de1ef9f4d6e2b&query=${latitude},${longitude}`
    request({url,json: true}, (error, {body}) => {
        if (error) {
            callback('Error ocurred. It\'s posiblie that conection not found!!!!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)  
        } else {
            console.log(body)
            const currentWeather = body.current
            callback(undefined, {
                    weather: currentWeather.weather_descriptions[0],
                    country: body.location.country,
                    locality: body.location.name,
                    temperature: currentWeather.temperature,
                    windChillFactor: currentWeather.feelslike,
                    humidity: currentWeather.humidity,
                    ultraviolet: currentWeather.uv_index               
            })
        }
    })
}

module.exports = forecast