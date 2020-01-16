FROM node:12.13.1-alpine3.10

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN npm install

# build a production ready app
RUN npm build

# start app
CMD ["npm", "start"]
