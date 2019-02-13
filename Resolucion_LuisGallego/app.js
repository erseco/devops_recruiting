/****************************   APP    *****************************/

// Dependencias
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var weather = require('openweather-apis');

var server_ip_address = '0.0.0.0';
app.set('puerto', 8001);
app.use(bodyParser.json());

weather.setLang('es');
weather.setCity('Tokyo');
weather.setUnits('metric');
var ownKey = '0f2925310d3fe6a78b65952cf62d8951';
weather.setAPPID(ownKey);

/*  "/hour/japan"
 *    GET: Devolver la hora en Tokyo
 */
app.post('/hello', function(request, response){  
    response.status(200).type('json').send(request.body.name + '\n');
});

/*  "/hour/japan"
 *    GET: Devolver la hora en Tokyo
 */
app.get('/hour/japan', function(request, response){
    var timeTokyo = moment().add(8, 'hours').format('HH:mm:ss');
    response.status(200).type('json').send("Hora en Tokyo: " + timeTokyo + '\n');    
});

/*  "/weather/japan"
 *    GET: Devolver la hora en Tokyo
 */
app.get('/weather/japan', function(request, response){
    weather.getAllWeather(function(err, JSONObj){
        var weatherTokyo = JSONObj;
    });   
    response.status(200).type('json').send(weatherTokyo + '\n');  
});

// Lanzamos la aplicacion
app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Aplicacion corriendo en " + server_ip_address + ":" + app.get('puerto'));    
});