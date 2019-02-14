FROM node:11-alpine AS base

LABEL maintainer="Bender the Offender "

WORKDIR /app

# Define registry to improve porformance
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

CMD [ "npm", "start" ]