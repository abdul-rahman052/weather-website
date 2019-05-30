const request = require("request");

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d24327a496dca5f362731cba02b97da4/'+latitude+','+longitude+'?units=si'

request({ url,json:true },(error,res)=>{
    if(error){
        callback('Unable to connect to service',undefined)
    } else if(res.body.error) {
        callback('Unable to find location',undefined)
    } else{
        callback(undefined,'It is currently '+res.body.currently.temperature+' degress out. There is '+res.body.currently.precipProbability+'% chance of rain')
    }
    
})

}

module.exports = forecast;