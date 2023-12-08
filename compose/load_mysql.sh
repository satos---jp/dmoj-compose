set -eux

cat all_dump.sql | sudo docker exec -i `sudo docker ps | grep mysql | awk '{print $1}'` mysql -uroot -ptfg54y65j67gh5676fk8g755g6j6vb7inbv56
