import TelegramBot, { Message } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const leave = (api: TelegramBot, message: Message): Promise<Message | boolean | Error> => {
  return new Promise((resolve) => {
    const { chat } = message;

    if ( chat.type !== 'group' && chat.type !== 'supergroup' ) {
      resolve(api.sendMessage(chat.id, __('leave_on_private')));
      return;
    }

    api.sendMessage(chat.id, __('leave')).then(() => {
      resolve(api.leaveChat(chat.id));
    });
  });
};

export default leave;
