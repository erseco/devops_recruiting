import os
from flask import Flask
from flask import Response
from flask import json
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/cities.json')
def cities():
    data = {"cities" : ["Amsterdam","Berlin","New York","San Francisco","Tokyo"]}

    cities = data['cities']
    weather_data = obtener_tiempos(cities)
    data = {"cities" : weather_data}
    
    resp = Response(json.dumps(data), status=200, mimetype='application/json')
    return resp

def obtener_tiempos(lista_ciudades):

    cities_complete = []
    api_address='http://api.openweathermap.org/data/2.5/weather?appid=0c42f7f6b53b244c78a418f4f181282a&q='

    for city in lista_ciudades:

        city_and_weather = {}
        url = api_address + city
        json_data = requests.get(url).json()
        weather_city = json_data['weather'][0]['description']

        city_and_weather['city'] = city
        city_and_weather['weather'] = weather_city

        cities_complete.append(city_and_weather)

    return cities_complete

if __name__ == '__main__':

    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)