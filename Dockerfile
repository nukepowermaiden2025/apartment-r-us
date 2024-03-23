FROM node:20-alpine 

# this is the working directory inside our container - I can call it anything
WORKDIR /app

#Copy packages and then we will run yarn first before copying everything
COPY package.json .

# Run yarn to install dependencies
RUN  yarn

# Copy everything from the directory of the DockerFile into the image
COPY . .

# This is the port where the container will be accessible from
EXPOSE 3000

# Creates an anonymous place to store - meaning if it doesn't already exist create it. It can be a string or an array of string
VOLUME ["app/node_modules"]

CMD ["yarn", "run", "dev" ]