const path = require('path');
const express = require('express');
const request = require('request');
const hbs = require('hbs');
const geocode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js');

const port = process.env.PORT || 3000;

const app = express();

// Defining Paths
const publicDirectoryPath= path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars and views location
app.set('view engine', '.hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); 
   
// Define Public directory
app.use(express.static(publicDirectoryPath));


// Setting Up Routes
app.get('/help', (req, res) => {
    res.render('help', {  
        title: 'Help page',
        name: 'Adikwu John Nathaniel'

    })
})



app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Adikwu John'
    });                 
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Adikwu John'

    })
})






app.get('/weather', (req, res)=> {
    const address = req.query.address

        if(!req.query.address) {
            return  res.send({
                error: 'Please provide an address'
            })
       }

        geocode(address, (error, {latitude, longitude, location} = {})=> {
        
          if(error){
            return res.send({
                error: error
            });
          }
          console.log(latitude, longitude)
          forecast(latitude, longitude,(error, forecastData) => {
            if(error) {
              return res.send({
                error: error
              })
            }

            console.log(forecastData)

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        
           
            
          })
        })
       



 } ) 


app.get('/products',(req, res)=> {
    
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    
    res.send({
        products: []
    })

    
})



app.get('/help/*',(req, res) => {
    res.render('error', {
        title: '404',
        message: 'Couldn\'t help with search ',
        name: 'Adikwu John Nathaniel'

    })
})

app.get('*',(req, res)=> {
    res.render('error', {
        title: '404',
        message: 'Cannot find your request',
        name: 'Adikwu John Nathaniel'
    })
} )
app.listen(port, ()=> {
    console.log('Starting up the server');
}) 

