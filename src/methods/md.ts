import TelegramBot, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const md = (api: TelegramBot, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat, text = '' } = message;
    const matches = text.match(/^\/md\s([.\n]+?)/);

    if (!matches) {
      resolve(api.sendMessage(chat.id, __('md_undefined')));
      return;
    }

    const [, matchedText] = matches as string[];

    resolve(api.sendMessage(chat.id, matchedText, { parse_mode: 'Markdown' }));
  });
};

export default md;
