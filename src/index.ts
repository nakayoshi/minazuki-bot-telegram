import dotenv from 'dotenv';
import TelegramApi from 'node-telegram-bot-api';
import i18n from 'i18n';
import express from 'express';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import hello from './methods/hello';
import help from './methods/help';
import wikipedia from './methods/wikipedia';
import timezone from './methods/timezone';
import leave from './methods/leave';
import webarchive from './methods/webarchive';

i18n.configure({
  locales: ['ja', 'en'],
  defaultLocale: 'en',
  fallbacks: { 'ja-JP': 'ja' },
  directory: resolve(__dirname, '..', 'messages'),
  register: global,
});

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const host  = process.env.APP_HOST as string;
const token = process.env.AUTHORIZATION_TOKEN as string;

// Specify callback url as public url
const api = new TelegramApi(token);
api.setWebHook(`https://${host}/bot${token}`);

// Express listen it in :3000
const app = express();
app.use(bodyParser.json());
app.post(`/bot${token}`, (req, res) => {
  api.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(3000);

api.on('message', (message): void => {
  const { text, from } = message;

  if (from && from.language_code) {
    i18n.setLocale(from.language_code);
  }

  if (!text) {
    return;
  }

  /**
   * /hello
   */
  if (/^\/hello/.test(text)) {
    hello(api, message);

  /**
   * /help
   */
  } else if (/^\/help/.test(text)) {
    help(api, message);

  /**
   * /wiki [query]
   */
  } else if (/^\/wiki/.test(text)) {
    wikipedia(api, message);

  /**
   * /time [timezone]
   */
  } else if (/^\/timezone/.test(text)) {
    timezone(api, message);

  /**
   * /webarchive [url]
   */
  } else if (/^\/webarchive/.test(text)) {
    webarchive(api, message);

  /**
   * /leave
   */
  } else if (/^\/leave/.test(text)) {
    leave(api, message);
  }
});
