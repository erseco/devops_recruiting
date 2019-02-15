### 1. Check this configuration file and answer the questions

- What is this file?

Es un archivo de *Nginx*, que según el siguiente [enlace](https://www.nginx.com/resources/wiki/start/topics/examples/full/) corresponde al de configuración (.conf).

- There are errors on it? Which ones?

He localizado dos errores, uno es en la línea correspondiente a *proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for* que le falta el punto y coma final. Y el segundo sería el corchete final, correspondiente a *http {*.

- If you found errors, how did you found it?

La corrección sería añadir el punto y coma y el corchete que faltan.

- What is doing the section: 
  ```
      location ~* ^/.+/backup/$ {
          deny all;
      }
  ```

Con *deny all* se está bloqueando el paso a una serie de archivos.

- What is doing this line? `set $calendar_app_server exo-calendar:8891`

Según el siguiente [enlace](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set), *set* se encarga de establecer un valor a la variable que especifiquemos. En este caso se está asignando en *$calendar_app_server* el valor de *exo-calendar:8891*.

### 2. Create a REST service (choose your favourite language, but you cannot use Flask) with three entrypoints, we will test it with this sentences

Para la realización del ejercicio vamos a hacer uso de Node.js bajo el framework Express principalmente. Con estas dos herramientas construiremos el servicio que se nos pide, aunque haremos uso de alguna más en su desarrollo. Podemos encontrar el código [aquí](https://github.com/luiisgallego/devops_recruiting/blob/master/app.js).

Para la primera entrada, tan solo tenemos que tomar el request y devolver el parámetro deseado. En la segunda, como buscamos la hora en Tokyo, hemos usado la librería [Moments.js](https://momentjs.com/). Para ello hemos usado como base nuestra hora local, y añadido la diferencia horaria. Finalmente, en la última entrada que se pedía, para la temperatura hemos usado la api [openweather](https://www.npmjs.com/package/openweather-apis), que aunque solo mostramos la temperatura, esta nos proporcionaba bastante información meteorológica del lugar marcado.

Indicar que en este último caso era necesario obtener una api key, y por simplicidad se ha dejado en el código directamente, además de para poder usar el programa en el momento. Si bien, se podría haber creado una variable de entorno y así ocultarla.

#### Instalación y ejecución

Para hacer uso de la aplicación tenemos que seguir los siguiente pasos:

1. Instalar las dependencias:
    ~~~
    npm install
    ~~~
2. Ejecutar aplicación:
    ~~~
    npm start
    ~~~
3. Ahora ya podemos abrir otra terminal y realizar las órdenes *curl* pues nuestra aplicación estará corriendo en el puerto 8001.

### 3. Write a Dockerfile to pack the previous REST service in a Docker container, try to create it as smallest as you can.

El *Dockerfile* en cuestión lo podemos encontrar [aquí](https://github.com/luiisgallego/devops_recruiting/blob/master/Dockerfile).

En él se han buscado dos cosas, que sea lo más simple posible y que además, la imagen del contenedor ocupe el mínimo espacio posible, por eso hemos hecho uso de una imagen *alpine* con *node.js* preinstalado. Este tipo de imagen es de las más reducidas que podemos encontrar y además nos permite que en nuestro *Dockerfile* nos podamos saltar toda la instalación de *Node.js* y centrarnos directamente en las dependencias de nuestra aplicación y el lanzamiento de esta.

Una vez definido el *Dockerfile* los pasos seguidos para su construcción, ejecución y posterior subida a *Docker Hub* son los siguientes:

1. Construimos el contenedor:
    ~~~
    docker build -t luiisgallego/app .
    ~~~
    Lo lanzamos para comprobar que funciona correctamente.
    ~~~
    docker run -p 8001:8001 -d luiisgallego/app
    ~~~
2. Ya podemos hacer uso de *curl*.
3. Una vez probado, subimos el contenedor creado a *Docker Hub*:
    ~~~
    docker tag luiisgallego/app luiisgallego/appExoLever
    ~~~
    ~~~
    docker push luiisgallego/appExoLever
    ~~~

Podemos encontrar el contenedor creado [aquí](https://hub.docker.com/r/luiisgallego/appexolever).

### 4. Check the next Dockerfile and answer the questions:

1. What is wrong in this Dockerfile:

La instrucción *RUN apt-get install nodejs* es incorrecta por dos razones, si estamos utilizando *alpine* con *node:11*, declarado al inicio (FROM node:11-alpine AS base), ya tenemos preinstalado *nodejs*. Además, si consultamos la [wiki](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management) de *alpine* podemos ver que este no usa apt-get sino *apk*.

2. There are missing parts, can you complete it?

En principio veo el *Dockerfile* completo. Si el *package.json* tiene bien definidas todas las dependencias la aplicación debe funcionar correctamente. Posiblemente sea necesario añadir un puerto de escucha mediante EXPOSE.

3. Why are we using COPY twice?

Se usa así para aprovechar la caché de Docker. Podemos encontrar mas información [aquí](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

4. Upload it to Docker Hub

Se ha realizado la subida, aunque quizás esta no tenga sentido. Para realizarla se ha eliminado primeramente *RUN apt-get install nodejs* ya que es innecesario, además se ha eliminado la línea *COPY package.json npm-shrinkwrap.json .* ya que ambos archivos no existen. Tras esto, ha sido construido de la siguiente forma:
~~~
docker build -t luiisgallego/ejercicio4 .
~~~
~~~
docker tag luiisgallego/ejercicio4 luiisgallego/ejercicio4
~~~
~~~
docker push luiisgallego/ejercicio4
~~~

Podemos encontrar el contenedor creado [aquí](https://hub.docker.com/r/luiisgallego/ejercicio4). En el ejercicio anterior también se creó un contenedor para la aplicación desarrollada.


### 5. Check this repo, there is a python_app folder. Modify the code to allow printing the weather of every city in the list. Try to do TDD also.

Para la realización de este ejercicio hemos vuelto a usar la api de *openweather*, pero de forma distinta. Esta vez tan solo le tenemos que añadir a la url la ciudad en concreto y obtendemos el json con toda la información meteorológica.

Para su funcionamiento tenemos que instalar tanto Flask como requests, una vez instalado, tan solo tenemos que lanzar la aplicación y la tendremos disponible en el puerto 5000.

### 6. Which ports are open in www.exolever.com? How did you check it?

Podemos encontrar dos puertos abiertos, el 80 para http y el 443 para https. Esto lo hemos podido comprobar mediante *nmap*.

### 7. Which is the latest version of the Docker compose file reference?

Según la información oficial de *Docker*, que podemos encontrar [aquí](https://docs.docker.com/compose/compose-file/), la última versión es la *3.7*.

### 8. Create a bash script that asks the user for a "name" and call your webservice. Use colors if you can!

El script para la realización de este ejercicio lo podemos encontrar [aquí](https://github.com/luiisgallego/devops_recruiting/blob/master/ejercicio7.sh).

Si observamos el archivo podemos ver que una vez solicitado tu nombre, levanta la aplicación anteriormente creada y realiza la consulta curl, devolviendo esta el nombre que se introdujo inicialmente. Ademas, como la aplicación debe quedarse en segundo plano para poder realizar la consulta, al final del script matamos este proceso y así dejamos también el puerto libre. Para este último paso he usado la siguiente [consulta](https://stackoverflow.com/questions/3510673/find-and-kill-a-process-in-one-line-using-bash-and-regex) en *stackoverflow*. 

Para añadir colores también se ha consultado *stackoverflow*, lo podemos ver en este [enlace](https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux).

### 9. Build the container of the question 3 with travis-ci

He utilizado travis para realizar los test a la hora del despliegue como se puede ver [aquí](https://travis-ci.com/luiisgallego/devops_recruiting) aunque finalmente no se ha llegado a realizar la construcción del contenedor Docker posterior.

### 10. Create a docker-compose.yml to run the previous container

### 11. What is true regarding the following code?

La respuesta correcta es la *d) The code will execute correctly but the first async keyword should be removed as the function getList() already returns a promise*.