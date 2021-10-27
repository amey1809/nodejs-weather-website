const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
// "npm i hbs" (handlsbars set up with express) for dynamic template binding
// Methood 1]create views folder at root of project
app.set('view engine','hbs')
// Methood 2]Customizing views folder
//rename views folder to templates
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))

//Run app and on browser call below urls(For static data)
//localhost:3000/index.html (It must be deleted, which has static content and now we are using dynamic index.hbs)
//localhost:3000/about.html (It must be deleted, consist static content. about.hbs is used to make it dynamic)
//localhost:3000/help.html (Must be deleted)
//localhost:3000/weather

app.get('',(req,res)=>{
    //To use dynamic content through hbs use render() method.
    res.render('index',{
        title:'Weather App', //this is accessible in index.hbs dynamically.
        name:'Amey Sonawane'
    }) // i.e. index.hbs
})

app.get('/about',(req,res)=>{
    //To use dynamic content through hbs use render() method.
    res.render('about',{
        title:'About', //this is accessible in about.hbs dynamically.
        name:'Amey Sonawane'
    }) // i.e. about.hbs
})

app.get('/help',(req,res)=>{
    //To use dynamic content through hbs use render() method.
    res.render('help',{
        helpText:'This is help page.', //this is accessible in help.hbs dynamically. 
        title:'Help', //this is accessible in index.hbs dynamically.
        name:'Amey Sonawane'      
    }) // i.e. help.hbs
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    //console.log(req.query.address)
    geoCode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
           return res.send({error})
        }
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            //console.log(place)
            //console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            })
        })
    })   
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    //To render error page.   
   res.render('404',{
       errorMessage:'Help article not found!',
       title:'Error 404',
       name:'Amey Sonawane'
   })
})

app.get('/*',(req,res)=>{
    //To render error page.    
    res.render('404',{
        errorMessage:'Page not found!',
        title:'Error 404',
        name:'Amey Sonawane'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port ' + port +'.!!')
}) //default port