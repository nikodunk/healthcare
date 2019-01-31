FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# seed database
RUN ./node_modules/.bin/knex seed:run
RUN ./node_modules/.bin/knex migrate:latest

# Make React App
# RUN  cd client && npm install && npm run build


EXPOSE 8080

CMD [ "node", "app.js" ]