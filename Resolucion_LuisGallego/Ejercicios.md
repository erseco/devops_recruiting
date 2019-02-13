### 2. Create a REST service (choose your favourite language, but you cannot use Flask) with three entrypoints, we will test it with this sentences

Para la realización del ejercicio vamos a hacer uso de Node.js bajo el framework Express principalmente. Con estas dos herramientas construiremos el servicio que se nos pide, aunque haremos uso de alguna más en su desarrollo.

Para la primera entrada, tan solo tenemos que tomar el request y devolver el parámetro deseado. En la segunda, como buscamos la hora en Tokyo, hemos usado la librería [Moments.js](https://momentjs.com/). Para ello hemos usado como base nuestra hora local, y añadido la diferencia horaria. Finalmente, en la última entrada que se pedía, para el tiempo hemos usado la api [openweather](https://www.npmjs.com/package/openweather-apis).

Indicar que en este último caso era necesario obtener una api key, y por simplicidad se ha dejado en el código directamente, además de para poder usar el programa en el momento. Si bien, se podría haber creado una variable de entorno y así ocultarla.

#### Instalación y ejecución

Para hacer uso de la aplicación tenemos que seguir los siguiente pasos:

1. Instalar las dependencias (una vez que estamos en la carpeta *Resolucion_LuisGallego*):
    ~~~
    npm install
    ~~~
2. Ejecutar aplicación:
    ~~~
    npm start
    ~~~
3. Ahora ya podemos abrir otra terminal y realizar las órdenes curl pues nuestra aplicación estará corriendo en el puerto 8001.