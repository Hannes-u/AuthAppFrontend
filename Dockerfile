# base image
FROM node:14.15

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@14.1.1

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
