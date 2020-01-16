FROM node:12.13.1-alpine3.10

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN npm install

# install serve to launch built project 
RUN npm install -g serve

# build a production ready app
RUN npm run-script build

# start app
CMD ["serve -s", "build"]
