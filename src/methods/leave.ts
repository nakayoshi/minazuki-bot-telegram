import TelegramBot, { ChatMember } from 'node-telegram-bot-api';
import { __ } from 'i18n';

const leave = (api: TelegramBot, message: TelegramBot.Message): Promise<TelegramBot.Message | boolean | Error> => {
  return new Promise((resolve) => {
    const { chat, from } = message;

    if ( chat.type !== 'group' && chat.type !== 'supergroup' ) {
      resolve(api.sendMessage(chat.id, __('leave_on_private')));
      return;
    }

    if ( chat.id && from && from.id ) {
      api.getChatMember(chat.id, `${from.id}`).then((chatMember) => {
        if (chatMember instanceof Error || !chatMember.can_restrict_members) {
          resolve(api.sendMessage(chat.id, __('leave_permission_denied')));
          return;
        }

        api.sendMessage(chat.id, __('leave')).then(() => {
          resolve(api.leaveChat(chat.id));
        });
      });
    }
  });
};

export default leave;
