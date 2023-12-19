#!/bin/bash

set -eux

IMG=$(sudo docker ps | grep 'pwnproblem-ctf' | awk '{print $1}')
S=$(sudo docker exec $IMG /bin/sh -c ps)
PIDS=$(echo "$S" | grep 'hagaki_henkan' | awk '{print $1}')
# sudo docker exec $IMG kill -9 $PIDS

echo "これまじで止まりえないと思うので止まった場合はsatos呼んでください"

