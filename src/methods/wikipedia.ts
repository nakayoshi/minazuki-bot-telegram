import nodeTelegramBotApi, { Message } from 'node-telegram-bot-api';
import wikijs from 'wikijs';
import { __ } from 'i18n';

const wikipedia = (api: nodeTelegramBotApi, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat, text = '' } = message;
    const matches = text.match(/^\/wiki\s(.+?)$/);

    if (!matches) {
      resolve(api.sendMessage(chat.id, __('wikipedia_query_undefined')));
      return;
    }

    const conf = { apiUrl: 'https://ja.wikipedia.org/w/api.php' };
    const [, query] = matches as string[];

    wikijs(conf).page(query).then((page) => page.summary()).then((summary) => {
      const response = __('wikipedia', summary, `https://ja.wikipedia.org/wiki/${query}`);
      const options  = {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      };

      resolve(api.sendMessage(chat.id, response, options));
    }).catch(() => {
      resolve(api.sendMessage(chat.id, __('wikipedia_not_found')));
    });
  });
};

export default wikipedia;
