const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const cityName = req.body.cityName;
    const apiKey = "861afa1fc66bba7b297f29673f0728ee";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit +"#";
    
    https.get(url, function(resp){
    
        // console.log(resp); // Give entire response data on console
        console.log("abc:", resp.statusCode); // Only gives the statusCode from response data on console
    
        resp.on("data", function(d){
            // console.log(d); // Gives data in hexadecimal
            // We need JS object, So we are converting the data to JS object.
            const weatherData = JSON.parse(d);
            // console.log(weatherData); // Give entire weatherData
            const weatherTemp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon; // getting an image
            const imageUrl = `https://openweathermap.org/img/wn/${image}@2x.png`;
            res.write(`<h1>The temperature in ${weatherData.name} is ${weatherTemp} degree celsius.</h1>`);
            res.write(`<p>The weather is currently ${weatherDescription}.</p>`);
            res.write(`<img src=${imageUrl}>`);
            res.send();
        });
    });
    
});

app.listen(65000, function(){
    console.log("Server is running on port 3000");
});