FROM node:6.7.0

RUN apt-get update
RUN apt-get install docker
RUN apt-get install git


RUN curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

RUN mkdir app

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD ./ /app

EXPOSE "3000"
VOLUME ["/app/node_modules"]

CMD npm start