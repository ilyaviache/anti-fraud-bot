import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Hears, Action } from 'nestjs-telegraf';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';

import {
  MENUS,
  MENU_BUTTONS,
  WORKS_SCENE,
  WORDS_SCENE,
  CHANNELS_SCENE,
  ACCOUNTS_SCENE,
  AREA_SCENE,
  BUTTONS,
  TASKS_SCENE,
  COMMANDS,
} from './bot.constants';
import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { BotNavigationService } from './bot-navigation.service';
import { SettingsService } from 'src/settings/settings.service';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly botNavigationService: BotNavigationService,
    private readonly settingsService: SettingsService,
    private readonly usersService: UsersService
  ) {}

  // TODO: протестировать edge cases работы с сессиями

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.settingsService.reload();
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const inline_keyboard = [[BUTTONS.START_LISTEN]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    await ctx.reply(this.settingsService.TEXTS().MAIN.WELCOME, replyMarkup);
    // todo: service doesn't work
    // await this.botNavigationService.firstTouch(ctx);
  }

  @Hears(MENU_BUTTONS.AREA.text)
  async handleAreaMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(AREA_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.SUPPORT.text)
  async handleSupportMenu(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().MAIN.SUPPORT, replyMarkup);
    return;
  }
}
