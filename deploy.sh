#!/bin/bash

set -eo pipefail

if [  -z $(docker ps -a -f NAME=$1 | grep  $1) ]
then
	docker build -t $1:latest .
	docker run --network host --name $1 -d $1:latest
else
	docker build -t $1:latest .
	docker stop $1
	docker rm  $1 
	docker run --network host --name $1 -d $1:latest
fi
