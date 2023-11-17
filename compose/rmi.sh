sudo docker rmi `sudo docker images | grep "<none>" | awk '{print $3}'`
sudo docker volume prune -f
