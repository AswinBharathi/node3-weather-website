const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location  
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setting up static directory to serve
app.use(express.static(publicDirectoryPath))

//Main Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Malik'
    })
})

//About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Malik'
    })
})

//Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        messsge: 'For any queries, contact me through any of the following links.',
        title: 'Help',
        name: 'Malik'
    })
})

//Weather forecast
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address!'
        })
    }

    //Getting the weather 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            
            })
        })
    })  
    
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products: '[]'
    })
})

//Help Page Error
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page article not found!',
        name: 'Malik'
    })
})

//404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: '404 Page!',
        name: 'Malik'
    })
})

//Initializing the server
app.listen(port, () => {
    console.log('Server is on at port number ' + port)
})
