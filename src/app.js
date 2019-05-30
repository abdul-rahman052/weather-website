const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server runnning at port 3000");
})

app.use(express.static(path.join(__dirname,'../public')));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Abdul"
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.search){
        return res.send({
            error: "Please select an address"
        })
    }
    geocode(req.query.search,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address : req.query.search
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Abdul"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Abdul"
    })
})
app.get('/help/*',(req,res)=>{
    res.send('No help article found')
})

app.get('*',(req,res)=>{
    res.send('<h1>404 Page</h1>')
})