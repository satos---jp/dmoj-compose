set -eux

sudo docker exec -it `sudo docker ps | grep mysql | awk '{print $1}'` mysqldump -uroot -ptfg54y65j67gh5676fk8g755g6j6vb7inbv56 --add-drop-database --all-databases --add-locks > tmp.sql

tail -n +2 tmp.sql > all_dump.sql

rm tmp.sql

