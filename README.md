# exolever devops recruiting exercises

>It is not mandatory to finish all these exercises, but we would appreciate it if you explain how you solved them. Do a PR with your answers.

### 1. Check this configuration file and answer the questions

```
 http {
    default_type  application/octet-stream;
    include       /etc/nginx/mime.types;
  server {
      location ~* ^/.+/backup/$ {
          deny all;
      }
      location ~ ^/calendar/(.*)  {
          set $calendar_app_server exo-calendar:8891;
          proxy_pass         http://$calendar_app_server/$1$is_args$args;
          proxy_http_version 1.1;
          proxy_set_header   Upgrade $http_upgrade;
          proxy_set_header   Connection $connection_upgrade;
          proxy_set_header   Host $host;
          proxy_set_header   X-Real-IP $remote_addr;
          proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for
          proxy_set_header   X-Forwarded-Host $server_name;
          add_header         X-Bender "Bite my shiny metal ass";
      }
      location / {
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $http_host;
          proxy_redirect off;
          proxy_buffer_size 128k;
          proxy_buffers	4 256k;
          proxy_busy_buffers_size	256k;
          # *application* server like Unicorn/Rainbows! serve static files.
          if (!-f $request_filename) {
              proxy_pass http://exolever_app_server;
              break;
          }
      }
      gzip             on;
      gzip_min_length  1000;
      gzip_proxied     expired no-cache no-store private auth;
      gzip_types       text/plain text/html text/xml text/css text/javascript application/xml application/xhtml+xml;
  }
```
- What is this file?
  - Is a nginx configuration file
- There are errors on it? Which ones?
  - The line `proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for` doesn't have ending semicolon
  - The ending bracket is missing
  - In gzip_types you will get a warngin because text/html is defined by default, so you will sefine twice
- If you found errors, how did you found it?
  - nginx has a built-in sytax checker, invoke it with `nginx -c -t <file_path>`
- What is doing the section: 
  ```
      location ~* ^/.+/backup/$ {
          deny all;
      }
  ```
  - Is blocking the access to **all** backup folders contained inside a list of directories
- What is doing this line? `set $calendar_app_server exo-calendar:8891`
  - Is setting a variable with a value (is a trick to allow start nginx if the host `exo-calendar:8891` is down 

### 2. Create a REST service (choose your favourite language, but you cannot use Flask) with three entrypoints, we will test it with this sentences
- `curl -X POST -H "Content-Type: application/json" -d '{"name":"your name"}' localhost:8001/hello/` must return your name
- `curl -X GET localhost:8001/hour/japan/` must return the current time in Tokyo
- `curl -X GET localhost:8001/weather/japan/` must return the current temperature in Tokyo, you should use a public forecast API.

### 3. Write a Dockerfile to pack the previous REST service in a Docker container, try to create it as smallest as you can.

### 4. Check the next Dockerfile and answer the questions:
```
FROM node:11-alpine AS base

LABEL maintainer="Bender the Offender "

WORKDIR /app

# Configure timezone to Europe/Madrid (required by tests)
RUN apt-get install nodejs

# Define registry to improve porformance
RUN npm config set registry https://registry.npmjs.org/

COPY package.json npm-shrinkwrap.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]
```
- What is wrong in this Dockerfile
  - Alpine is not using apt-get, is using `apk` as package manager
  - If you are using a node alpine image node is already installed, you don't need to install it
  - If you call `COPY` with many files, the destination must be a directory, you must set `COPY package.json npm-shrinkwrap.json ./`
- There are missing parts, can you complete it?
  - _Trap question_
- Why are we using `COPY` twice?
  - For optimizing the docker stage cache to not doing `npm install` on every build
- Upload it to Docker Hub

### 4. Check this repo, there is a `python_app` folder. Modify the code to allow printing the weather of every city in the list. Try to do TDD also.

### 5. Which ports are open in `www.exolever.com`? How did you check it?
- 80 (http) and 443 (https)
- with `nmap www.exolever.com` or any online port checker

### 6. Which is the latest version of the Docker compose file reference?
- You can check it in https://docs.docker.com/compose/compose-file/, the current file reference is **3.7** and the docker engine version is **18.06.0+**

### 7. Create a bash script that asks the user for a "name" and call your webservice. Use colors if you can!

### 8. OPTIONAL Build the container of the question 3 with travis-ci

### 9. OPTIONAL Create a docker-compose.yml to run the previous container

### 10. OPTIONAL What is true regarding the following code?

```
async function getList () {
  return functionThatReturnsAPromise()
}

async function main () {
  const list = await getList()
  // ...
}

main()
```

- a) It will fail to execute as the async keyword is incorrectly used
- b) This code is correct and does not need to be improved
- c) The code will execute but the await function call will never return as the promises are not properly chained
**- d) The code will execute correctly but the first async keyword should be removed as the function getList() already returns a promise**
