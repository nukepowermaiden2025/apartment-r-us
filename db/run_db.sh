#! /bin/bash

#-p port 3307:3306 is the port of my_local_port:docker_port
docker run \
-p 3307:3306 \
--name mysql \
-e MYSQL_DATABASE=beta_test \
-e MYSQL_ROOT_PASSWORD=secret-root \
-d \
mysql:latest