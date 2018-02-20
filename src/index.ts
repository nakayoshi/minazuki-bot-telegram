import dotenv from 'dotenv';
import nodeTelegramBotApi, { Message } from 'node-telegram-bot-api';
import i18n from 'i18n';
import { resolve } from 'path';

import hello from './methods/hello';
import wikipedia from './methods/wikipedia';
import timezone from './methods/timezone';

dotenv.config({ path: '.env' });

i18n.configure({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  fallbacks: { 'ja-JP': 'ja' },
  directory: resolve(__dirname, '..', 'messages'),
  register: global,
});

class Minazuki {

  public api: nodeTelegramBotApi;

  constructor () {
    const token = process.env.AUTHORIZATION_TOKEN as string;

    this.api = new nodeTelegramBotApi(token, { polling: true });
    this.api.on('message', (message: Message): void => this.handleMessage(message));
  }

  handleMessage (message: Message): void {
    const { text, chat, from } = message;

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
      hello(message).then((text) => {
        this.api.sendMessage(chat.id, text);
      });

    /**
     * /wiki [query]
     */
    } else if (/^\/wiki/.test(text)) {
      wikipedia(message).then((text) => {
        this.api.sendMessage(chat.id, text, {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        });
      });

    /**
     * /time [timezone]
     */
    } else if (/^\/time/.test(text)) {
      timezone(message).then((text) => {
        this.api.sendMessage(chat.id, text);
      });
    }
  }

}

export default new Minazuki();
