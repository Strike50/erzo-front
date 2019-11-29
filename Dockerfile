FROM node:12.13.1-alpine3.10

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN npm install

# start app
CMD ["npm", "start"]
