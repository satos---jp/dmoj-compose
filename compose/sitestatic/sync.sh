set -eux
rm -r webproblem/
mkdir webproblem

mkdir web
cp -r ../webproblem/dist/* web/
cp ../db_after_dmoj/init.sql web/

sed -i 's/mysql:\/\/webp:.*@db/#####DELETED#####/' web/app.js
sed -i 's/ATGT{[^}]*}/#####DELETED#####/' web/init.sql

tar czvf webproblem/dist.tar.gz web/
rm -r web
