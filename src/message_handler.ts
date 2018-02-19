import dotenv from 'dotenv';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import hello from './methods/hello';

const messageHandler = (message: Message): string | void => {
  const { text, chat } = message;

  if (text === undefined) {
    return;
  }

  if ( text.match(/\/hello/) ) {
    return hello(message);
  } else {
    return '';
  }
}

export default messageHandler;
