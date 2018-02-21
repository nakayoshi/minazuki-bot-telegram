import nodeTelegramBotApi, { Message } from 'node-telegram-bot-api';
import axios from 'axios';
import { __ } from 'i18n';

const webarchive = (api: nodeTelegramBotApi, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat, text = '' } = message;
    const matches = text.match(/^\/webarchive\s((?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*)$/);

    if (!matches) {
      resolve(api.sendMessage(chat.id, __('webarchive_undefined')));
    }

    const [, url] = matches as string[];
    const formattedUrl = `https://web.archive.org/save/${url}`;
    const options = {
      disable_web_page_preview: true,
    };

    axios.get(formattedUrl).then(() => {
      resolve(api.sendMessage(chat.id, __('webarchive', formattedUrl), options));
    }).catch(() => {
      resolve(api.sendMessage(chat.id, __('webarchive_not_found')));
    });
  });
};

export default webarchive;
