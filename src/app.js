const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define path for express configuration
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Setup handlebars engine and vies location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Bharat Rajora'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location}) => {
        if(error) {
        return res.send({error})
    }

    forecast(latitude,longitude, (error,forecastData) => {
        if(error) {
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address:req.query.address
        })
    })
    })
})
   

app.get('/about',(req,res) => {
    res.render('about',{
        heading : 'This is a About Page',
        title: 'About Me',
        name: 'Bharat Rajora'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpMsg: 'This is a helpful page',
        title:'Help Page',
        name:'Bharat'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        ErrorMsg:'Page Not Found',
        name: 'Bharat',
        title:'404'
    })
})

app.listen(3000,function(req,res){
    console.log('Server is running on port 3000')
})
