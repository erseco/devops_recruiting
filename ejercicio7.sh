#!/bin/bash

RED='\033[0;31m'
NC='\033[0m' # Fin Color

echo -e "${RED}Comenzamos el ejercicio 7.${NC}"
echo -e "Introduce tu nombre: "
read nombre

echo "Levantamos la aplicación: "
node app.js &
sleep 2

echo "Realizamos consulta con curl: "
curl -X POST -H "Content-Type: application/json" -d '{"name":"'$nombre'"}' "localhost:8001/hello/"

echo "Matamos el proceso de node creado en segundo plano."
kill $(ps aux | grep 'node app.js' | grep -v grep | awk '{print $2}')
echo -e "${RED}Fin.${NC}"
