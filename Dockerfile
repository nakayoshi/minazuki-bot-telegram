FROM node:9.5-alpine

LABEL maintainer='Neetshin <n33t5hin@gmail.com>' \
      description='Super kawaii chat bot for Telegram'

ENV NODE_ENV=production

WORKDIR /minazuki-bot

RUN apk -U upgrade \
 && apk add \
    curl \
    git \
    nodejs \
    nodejs-npm \
    yarn \
 && npm install -g typescript \
 && rm -rf /var/cache/apk/*

COPY . /minazuki-bot

VOLUME /minazuki-bot

CMD ["echo running"]
