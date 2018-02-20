import momentTimezone from 'moment-timezone';
import nodeTelegramBotApi, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const timezone = (api: nodeTelegramBotApi, message: Message): Promise<Message | Error> => {
  return new Promise((resolve) => {
    const { chat, text = '' } = message;
    const matches = text.match(/^\/timezone (.+?)$/);

    if (!matches) {
      return resolve(api.sendMessage(chat.id, __('timezone_undefined')));
    }

    const [, timezoneName] = matches as string[];

    try {
      const formattedDate = momentTimezone().tz(timezoneName).format(__('datetime'));
      resolve(api.sendMessage(chat.id, formattedDate));
    } catch {
      resolve(api.sendMessage(chat.id, __('timezone_not_found')));
    }
  });
};

export default timezone;
