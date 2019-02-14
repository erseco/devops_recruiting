#!/bin/bash

echo "Introduce tu nombre: "
read nombre

echo "Levantamos la aplicación: "
node app.js &
sleep 2

echo "Realizamos consulta con curl: "
curl -X POST -H "Content-Type: application/json" -d '{"name":"'$nombre'"}' "localhost:8001/hello/"

echo "Matamos el proceso de node creado en segundo plano."
kill $(ps aux | grep 'node app.js' | grep -v grep | awk '{print $2}')
echo "Fin."
