sudo docker exec `sudo docker ps | grep mysql | awk '{print $1}'` /bin/sh -c /initafterdmoj/init.sh
