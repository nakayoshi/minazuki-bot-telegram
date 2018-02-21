import TelegramBot, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const hello = (api: TelegramBot, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat, from } = message;
    resolve(api.sendMessage(chat.id, from && from.first_name ? __('hello_with_name', from.first_name) : __('hello')));
  });
};

export default hello;
