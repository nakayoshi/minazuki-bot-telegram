FROM node:8.9.4-alpine

LABEL maintainer='Neetshin <n33t5hin@gmail.com>' \
      description='Super kawaii chat bot for Telegram'

ENV NODE_ENV=production

WORKDIR /minazuki-bot

EXPOSE 3000

RUN apk -U upgrade \
 && apk add \
    curl \
    git \
    nodejs \
    nodejs-npm \
    yarn \
 && npm install -g typescript \
 && rm -rf /var/cache/apk/*

COPY package.json yarn.lock /minazuki-bot

RUN yarn install --pure-lockfile \
 && yarn run clear

COPY . /minazuki-bot

VOLUME /minazuki-bot

CMD ["npm run start"]
