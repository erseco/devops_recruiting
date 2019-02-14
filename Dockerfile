FROM node:10-alpine     
WORKDIR /app

COPY package.json ./
COPY ./app.js .
RUN npm install

CMD [ "npm", "start" ]
EXPOSE 8001
