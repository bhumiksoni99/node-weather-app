const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmh1bWlrc29uaSIsImEiOiJjang0eHBkd3QwZGF6M3lydnN5bjBsaW9tIn0.IHdbwo7jmHm2KkQuxKdPcg&limit=1'

    request({ url ,json:true} , (error,response) => {
        if(error){
            callback('Unable to use the geolocation api')
        } else if(response.body.features.length === 0){
            callback('Unable to find the location')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }) 
        }

    })
}
module.exports = geocode