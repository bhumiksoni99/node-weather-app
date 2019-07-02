const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:'Bhumik'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About Me',
        name:'Bhumik'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        contact:'99775',
        email:'help@someone.com',
        title:'Help page',
        name:'Bhumik'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Pls enter an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error)
        {
            return res.send({error:error}) 
        }
        forecast(latitude,longitude,(error,forecastdata) =>{
        if(error)
        {
            return res.send({error:error})
        }
     res.send({
        forecast : forecastdata,
        location,  //shorthand for location:location
        address:req.query.address
    })
})
})
})
app.get('/help/*', (req,res) => {
    res.render('error',{
        error:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('error', {
        error:'Page not found'
    })
})


app.listen(port, ()=> {
    console.log('running')
})
