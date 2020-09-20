const request = require('request')

//Defining geocode
const geocode = (location, cb) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXN3aW5hYjAwMSIsImEiOiJja2QxZWdxaDYxMnFoMnRwZzIybWdtaHl2In0.UBIPNP_b3aiFiik4fxsT1A'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            cb('Unavle to connect to the service!', undefined)
        } else if (body.features.length === 0) {
            cb('Unable to locate the given place. Try again!', undefined)
        } else {
            cb(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

//Exporting geocode
module.exports = geocode