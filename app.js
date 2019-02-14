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

//////////////////////
app.get('/', function(request, response){
    response.status(200).type('json').send();    
});
//////////////////////

/*  "/hello"
 *    GET: Devuelve el nombre que se le pasó como parametro
 */
app.post('/hello', function(request, response){  
    response.status(200).type('json').send(request.body.name + '\n');
});

/*  "/hour/japan"
 *    GET: Devolver la hora en Tokyo
 */
app.get('/hour/japan', function(request, response){
    var timeTokyo = moment().locale('es').add(8, 'hours').format('HH:mm:ss');
    response.status(200).type('json').send("Hora en Tokyo: " + timeTokyo + '\n');    
});

/*  "/weather/japan"
 *    GET: Devolver la temperatura en Tokyo
 */
app.get('/weather/japan', function(request, response){
    weather.getAllWeather(function(err, JSONObj){
        response.status(200).type('json').send("Temperatura en Tokyo: " + JSONObj.main.temp + "º \n");
    });   
});

// Lanzamos la aplicacion
app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Aplicacion corriendo en " + server_ip_address + ":" + app.get('puerto'));    
});

// Exporta la variable para poder hacer tests
module.exports = app;