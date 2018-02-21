import TelegramBot, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const hello = (api: TelegramBot, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat } = message;
    resolve(api.sendMessage(chat.id, __('help')));
  });
};

export default hello;
