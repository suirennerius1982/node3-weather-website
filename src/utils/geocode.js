const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3VpcmVubmVyaXVzMTk4MiIsImEiOiJja2JpYWEzb2EwMWtqMnJwZ2RxaXJiMzZvIn0.cEzTbT5h5NaJd81a2un-rw&limit=1`
    request({url, json: true}, (error, {body} = {}) => {     
        if (error) {
            callback('Error ocurred. It\'s posiblie that conection not found!!!!', undefined)
        } else if (body.features.length === 0) {
            callback({error: 'Not matching results'}, undefined)
        } else {
            const center = body.features[0].center
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: center[1],
                longitude: center[0]
            })
        }
    })
}

module.exports = geocode