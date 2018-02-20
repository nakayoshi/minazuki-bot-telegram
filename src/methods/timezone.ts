import momentTimezone from 'moment-timezone';
import { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const timezone = (message: Message): Promise<string> => {
  return new Promise((resolve) => {
    const { text = '' } = message;
    const matches = text.match(/^\/time (.+?)$/);

    if (!matches) {
      return resolve(__('timezone_undefined'));
    }

    const [, timezone] = matches as string[];

    try {
      const formattedDate = momentTimezone().tz(timezone).format(__('datetime'));
      resolve(formattedDate);
    } catch {
      return resolve(__('timezone_not_found'));
    }
  });
};

export default timezone;
