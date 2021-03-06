FROM node:14.13.0-alpine

WORKDIR /usr/app

#install node modules/dependencies
COPY package*.json ./

RUN npm ci 

COPY . .

EXPOSE 3000

USER node

CMD ["node", "./server.js"]
