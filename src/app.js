const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000
/* console.log(__dirname)
console.log(__filename) */

//Define path for Express confing 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const patrialPath = path.join(__dirname, '../templates/partials')
//console.log(express.static(publicDirectoryPath))

//Set up handlebars and views location
app.set('view engine', 'hbs') //setting use the especific engine template to run in express
app.set('views', viewsPath)
hbs.registerPartials(patrialPath)
 
//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index' , {
        title: 'Weather APP',
        author: 'Nerius Perez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'Nerius Pérez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Plese, if you need help, please contact that this email: ',
        email: 'suirennerius1982@gmail.com',
        author: 'Nerius Perez'
    })
})

app.get('/weather', (req, res) => {
    const errorGeneric = {
        error: 'Ocurred an error'
    }
    if(!req.query.address) {
        return res.send({
            error: 'Not provider Address param'
        })
    } else if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude } = {}) => {
            if (error) {
                return res.send(error)
            } else {
                forecast(latitude, longitude, (errorForesCast, weatherObject) => {
                    const { weather, country, locality, temperature, windChillFactor } = weatherObject
                    if (errorForesCast) {
                        console.log(errorForesCast)
                        return res.send({
                            error: errorForesCast
                        })
                    } else {
                         console.log(`Part weather in ${req.query.address} is ${weather}, in country ${country} 
                                     locality ${locality}. The temperature is: ${temperature} and the 
                                     windChillFactor ${windChillFactor}`) 
                        res.send(
                            weatherObject
                        )
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Nerius Pérez',
        notFoundMessage: 'Page subarticle to help not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        notFoundMessage: 'Resource not found',
        title: '404',
        author: 'Nerius Pérez'
    })   
})



//http://app.com
//http://app.com/help
//http://app.com/about

app.listen(port, () => {
    console.log(`Server is up on port ${port}!!!`)
})