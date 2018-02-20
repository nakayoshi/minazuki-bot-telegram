import { Message } from 'node-telegram-bot-api';
import wikijs from 'wikijs';
import { __ } from 'i18n';

const wikipedia = (message: Message): Promise<string> => {
  const { text = '' } = message;
  const matches = text.match(/^\/wiki (.+?)$/);

  if (!matches) {
    return Promise.resolve(__('wikipedia_query_undefined'));
  }

  const conf = { apiUrl: 'https://ja.wikipedia.org/w/api.php' };
  const [, query] = matches as string[];

  return wikijs(conf).page(query).then(page => page.summary()).then((summary) => {
    return __('wikipedia', summary, `https://ja.wikipedia.org/wiki/${query}`);
  }).catch(() => {
    return __('wikipedia_not_found');
  });
};

export default wikipedia;
