import i18n from 'i18n';
import { resolve } from 'path';

i18n.configure({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  directory: resolve(__dirname, 'messages'),
  register: global,
})
