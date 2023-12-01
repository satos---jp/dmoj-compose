set -eux

# WebProblem

rm -r webproblem/
mkdir webproblem

mkdir web
cp -r ../webproblem/dist/* web/
cp ../db_after_dmoj/init.sql web/

sed -i 's/mysql:\/\/webp:.*@db/#####DELETED#####/' web/app.js
sed -i 's/ATGT{[^}]*}/#####DELETED#####/' web/init.sql

zip -r webproblem/web.zip web/
rm -r web

# PwnProblem

rm -r pwnproblem/
mkdir pwnproblem

mkdir pwn
cp -r ../pwnproblem/dist/* pwn/

zip -r pwnproblem/pwn.zip pwn/
rm -r pwn

# CryProblems

rm -r cryptoproblem1/
mkdir cryptoproblem1/

mkdir crypto1
cp -r ../cryproblem/dist/* crypto1/

zip -r cryptoproblem1/crypto1.zip crypto1/
rm -r crypto1

rm -r cryptoproblem2/
mkdir cryptoproblem2/

mkdir crypto2
cp -r ../cryproblem/dist2/* crypto2/

zip -r cryptoproblem2/crypto2.zip crypto2/
rm -r crypto2