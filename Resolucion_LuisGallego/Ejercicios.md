### 2. Create a REST service (choose your favourite language, but you cannot use Flask) with three entrypoints, we will test it with this sentences

Para la realización del ejercicio vamos a hacer uso de Node.js bajo el framework Express principalmente. Con estas dos herramientas construiremos el servicio que se nos pide, aunque haremos uso de alguna más en su desarrollo. Podemos encontrar el código [aquí](https://github.com/luiisgallego/devops_recruiting/blob/master/Resolucion_LuisGallego/app.js).

Para la primera entrada, tan solo tenemos que tomar el request y devolver el parámetro deseado. En la segunda, como buscamos la hora en Tokyo, hemos usado la librería [Moments.js](https://momentjs.com/). Para ello hemos usado como base nuestra hora local, y añadido la diferencia horaria. Finalmente, en la última entrada que se pedía, para la temperatura hemos usado la api [openweather](https://www.npmjs.com/package/openweather-apis), que aunque solo mostramos la temperatura, esta nos proporcionaba bastante información meteorológica del lugar marcado.

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

### 3. Write a Dockerfile to pack the previous REST service in a Docker container, try to create it as smallest as you can.

El *Dockerfile* en cuestión lo podemos encontrar [aquí](https://github.com/luiisgallego/devops_recruiting/blob/master/Resolucion_LuisGallego/Dockerfile).

En él se han buscado dos cosas, que sea lo más simple posible y que además, la imagen del contenedor ocupe el mínimo espacio posible, por eso hemos hecho uso de una imagen *alpine* con *node.js* preinstalado. Este tipo de imagen es de las más reducidas que podemos encontrar y además nos permite que en nuestro *Dockerfile* nos podamos saltar toda la instalación de *Node.js* y centrarnos directamente en las dependencias de nuestra aplicación y el lanzamiento de esta.

Una vez definido el *Dockerfile* los pasos seguidos para su construcción, ejecución y posterior subida a *Docker Hub* son los siguientes:

1. Construimos el contenedor:
    ~~~
    docker build -t luiisgallego/app .
    ~~~
    ~~~
    docker run -p 8001:8001 -d luiisgallego/app
    ~~~
2. Ya podemos hacer uso de curl.
3. Una vez probado, subimos el contenedor creado a *Docker Hub*:
    ~~~
    
    ~~~
    ~~~
    
    ~~~






    ~~~
    
    ~~~