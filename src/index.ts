import dotenv from 'dotenv';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import messageHandler from './message_handler';
dotenv.config({ path: '.env' });

console.log('i am index');

const token: string | undefined = process.env.AUTHORIZATION_TOKEN;

if (token === undefined) {
  throw "Authorization token was not set";
}

const Minazuki = new TelegramBot(token, { polling: true });

Minazuki
  .on('message', (message: Message): void => {
    const responseText: string | void = messageHandler(message);
    const { chat } = message;

    if ( responseText ) {
      Minazuki.sendMessage(chat.id, responseText);
    }
  });
