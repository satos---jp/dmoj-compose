sudo docker kill `sudo docker ps | grep dmoj-judger | awk '{print $1}'`
sudo docker rm `sudo docker ps -a | grep dmoj-judger | awk '{print $1}'`
