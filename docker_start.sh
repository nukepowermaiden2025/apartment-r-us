#! /bin/bash
# -v map the present working directory to src
# -d means run in the backgroud
# -n is the container name
# -t used on the docker build command to tag an image so dont have to keep using the image id


# Create a network so the DB can attach as well 
docker network create apartment-db-network

docker run \
-p 3000:3000  \
-v /Users/kourtneyreynolds/repos/apartment-r-us/:/app \
--name apartments-service \
--network apartment-db-network \
node-20-alpine:v1