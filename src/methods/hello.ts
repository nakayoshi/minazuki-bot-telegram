import TelegramBot, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const hello = (message: Message): string => {
  return  __('hello');
}

export default hello;
