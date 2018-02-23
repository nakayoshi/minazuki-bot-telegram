FROM node:8.9.4-alpine

LABEL maintainer='Neetshin <n33t5hin@gmail.com>' \
      description='Super kawaii chat bot for Telegram'

ARG ssl_certificate
ARG ssl_key

ENV NODE_ENV=production

WORKDIR /minazuki-bot

EXPOSE 443

RUN apk -U upgrade \
 && apk add \
    curl \
    git \
    nodejs \
    nodejs-npm \
    yarn \
 && npm install -g typescript \
 && rm -rf /var/cache/apk/*

COPY package.json yarn.lock /minazuki-bot/

COPY $ssl_certificate /etc/ssl/cert.pem
COPY $ssl_key /etc/ssl/key.pem

RUN yarn install --pure-lockfile \
 && yarn run clear

COPY . /minazuki-bot

CMD ["npm", "run", "start"]
