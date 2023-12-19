#!/bin/bash

set -eux

IMG=$(sudo docker ps | grep 'compose-webproblem' | awk '{print $1}')
S=$(sudo docker exec $IMG /bin/sh -c ps)
PIDS=$(echo "$S" | grep node | awk '{print $1}')
sudo docker exec $IMG kill -9 $PIDS

