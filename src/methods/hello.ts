import { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const hello = (message: Message): Promise<string> => {
  return new Promise((resolve) => {
    const { from } = message;

    if (from && from.first_name) {
      resolve(__('hello_with_name', from.first_name));
    }

    resolve(__('hello'));
  });
};

export default hello;
