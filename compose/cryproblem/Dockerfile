FROM node:16.3.0-alpine

RUN apk add supervisor --no-cache

COPY data /root/data

COPY dist /root/app1
WORKDIR /root/app1

RUN npm install

COPY dist2 /root/app2
WORKDIR /root/app2

RUN npm install

CMD [ "/usr/bin/supervisord", "-c", "/etc/supervisord.conf" ]
