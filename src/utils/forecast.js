const request = require ('request')

//Defining forecast 
const forecast = (longitude, latitude, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=dee66a5e0bbfe9bd7f5de0f3f6a03d24&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            cb('Unable to access the weather service!', undefined)
        } else if (body.error) {
            cb('Unable to detect the location!', undefined)
        }  else {
            cb(undefined , body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

//Exporting forecast
module.exports = forecast