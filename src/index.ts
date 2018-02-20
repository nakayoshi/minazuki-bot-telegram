import dotenv from 'dotenv';
import nodeTelegramBotApi, { Message } from 'node-telegram-bot-api';
import i18n from 'i18n';
import { resolve } from 'path';

import hello from './methods/hello';
import help from './methods/help';
import wikipedia from './methods/wikipedia';
import timezone from './methods/timezone';
import leave from './methods/leave';
import webarchive from './methods/webarchive';

dotenv.config({ path: '.env' });

i18n.configure({
  locales: ['ja', 'en'],
  defaultLocale: 'en',
  fallbacks: { 'ja-JP': 'ja' },
  directory: resolve(__dirname, '..', 'messages'),
  register: global,
});

class Minazuki {

  public api: nodeTelegramBotApi;

  constructor() {
    const token = process.env.AUTHORIZATION_TOKEN as string;

    this.api = new nodeTelegramBotApi(token, { polling: true });
    this.api.on('message', (message: Message): void => this.handleMessage(message));
  }

  private handleMessage(message: Message): void {
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
      hello(this.api, message);

    /**
     * /helo
     */
    } else if (/^\/help/.test(text)) {
      help(this.api, message);

    /**
     * /wiki [query]
     */
    } else if (/^\/wiki/.test(text)) {
      wikipedia(this.api, message);

    /**
     * /time [timezone]
     */
    } else if (/^\/timezone/.test(text)) {
      timezone(this.api, message);

    /**
     * /webarchive [url]
     */
    } else if (/^\/webarchive/.test(text)) {
      webarchive(this.api, message);

    /**
     * /leave
     */
    } else if (/^\/leave/.test(text)) {
      leave(this.api, message);
    }
  }

}

export default new Minazuki();
