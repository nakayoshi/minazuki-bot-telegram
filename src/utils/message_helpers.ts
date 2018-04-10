import { me } from '../index';

interface INormalizedCommand {
  command: string;
  replyTo: string;
  rest?: string;
}

export const repliedCommandNormalizer = (text: string): INormalizedCommand => {
  const [, command, replyTo, rest] = text.match(/(\/[a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\s(.*?)/) as string[];

  if (replyTo !== me.username) {
    return { command: '', replyTo: '' };
  }

  return { command, replyTo, rest };
};
