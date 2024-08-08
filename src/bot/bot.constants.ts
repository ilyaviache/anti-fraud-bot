import { Markup } from 'telegraf';

export const COMMANDS = {
  START: 'start',
  BACK: 'BACK',
  OK: 'OK',
  NO: 'CANCEL',
  CANCEL: 'CANCEL',
  CONTINUE: 'CONTINUE',
};

export const MENU_BUTTONS = {
  BACK_TO_MENU: { text: 'Вернуться в меню' },
  OK: { text: '✅' },
  CANCEL: { text: '⛔️' },
  BACK: { text: '⬅ Назад', callback_data: 'BACK' },
};

export const BUTTONS = {
  BACK: Markup.button.callback('⬅ Назад ️', COMMANDS.BACK),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  NO: Markup.button.callback('⛔️', COMMANDS.NO),
  CANCEL: Markup.button.callback('⛔️', COMMANDS.CANCEL),
  CONTINUE: Markup.button.callback('➡️ продолжить', COMMANDS.CONTINUE),
};

export const TEXTS = {
  MAIN: {
    WELCOME: 'Welcome Message',
  },
};

export const MENUS = {
  MAIN_MENU: [],
};
