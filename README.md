# minazuki-bot

[![https://telegram.me/minazuki_bot](https://img.shields.io/badge/💬%20Telegram-minazuki_bot-blue.svg)](https://t.me/minazuki_bot)

Super kawaii Chat bot for Telegram

## Using the bot
You can use following command:
|Command|Options|Description|Required permission|
|:------|:------|:----------|:------------------|
|`/hello`|-|Says hello to you|-|
|`/wiki`|Title of article|Searches an article in Wikipedia|-|
|`/webarchive`|URL|Requests to archive the web page with archive.org (beta)|-|
|`/timezone`|Timezone name|Convert current time at the timezone|-|
|`/leave`|-|Leave from group|`can_restrict_members`|

## Development
### Run
First, you need to specify certificate for webhook, authorization token of the bot, and your web domain in `.env`. Here's an example:
```.env
APP_HOST=minazuki.neet.love
APP_PORT=3000
AUTHORIZATION_TOKEN=510130471:ashdfjkalsdjfhalkjshdfkl
SSL_CERT=/path/to/your/public-key/file.pem
```

Then, install dependent packages:
```bash
yarn install --pure-lockfile
```

Then, you can start the app just by:
```bash
npm start
```

### Test
```bash
npm run test
```
