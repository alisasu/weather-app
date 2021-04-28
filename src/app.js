const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000

// Paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

// Routes
app.get('', (req, res, next) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alisa Su'
    })
})

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alisa Su'
    })
})

app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help',
        name: 'Alisa Su',
        cryForHelp: "You think this help page is for your benefit? No, this is my cry for help. I have three kids and no money. Why can't I have no kids and three money?"
    })
})

app.get('/weather', (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    geocode(req.query.address, (err, locationData) => {
        if (err) {
            return res.json({
                err
            })
        }
        forecast(locationData, (err, forecastData) => {
            if (err) {
                return res.json({
                    address: req.query.address,
                    location: "",
                    error: err,
                })
            }
            res.json({
                address: req.query.address,
                location: locationData,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/help/*', (req, res, next) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Alisa Su',
        message: 'Help article not found.'
    });
})

app.get('*', (req, res, next) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Alisa Su',
        message: 'Page not found.'
    });})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})
