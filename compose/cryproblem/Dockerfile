FROM node:16.3.0-alpine

COPY dist /root/app
WORKDIR /root/app

RUN apk add supervisor --no-cache && npm install

CMD [ "/usr/bin/supervisord", "-c", "/etc/supervisord.conf" ]
