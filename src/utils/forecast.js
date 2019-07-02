const request = require('request')

const forecast = (lat,long, callback) => {

    const url = 'https://api.darksky.net/forecast/31209b83254c77a95c2b0308775342c0/' + encodeURIComponent(lat) +',' +  encodeURIComponent(long) +'?units=si'

    request({url ,json :true} ,(error,response) => {
        if(error){
            callback('Unable to use the weather api')
        } else if(response.body.error){
            callback('Unable to find the location')
        } else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' with a ' +response.body.currently.precipProbability +' % chance of rain.') 
            }

    })
}
module.exports = forecast