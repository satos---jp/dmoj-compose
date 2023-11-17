sudo docker kill `sudo docker ps | grep dmoj-judger | awk '{print $1}'`
