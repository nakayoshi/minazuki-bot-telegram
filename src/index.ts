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
import md from './methods/md';

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
const port  = process.env.APP_PORT || 80;

const api = new TelegramApi(token);
api.setWebHook(`https://${host}/bot${token}`, {
  certificate: process.env.SSL_CERT,
});

const app = express();
app.use(bodyParser.json());
app.post(`/bot${token}`, (req, res): void => {
  api.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(port);

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
   * /md [text]
   */
  } else if (/^\/md/.test(text)) {
    md(api, message);

  /**
   * /leave
   */
  } else if (/^\/leave/.test(text)) {
    leave(api, message);
  }
});
