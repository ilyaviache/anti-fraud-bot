import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, On, Hears } from 'nestjs-telegraf';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';

import { MENU_BUTTONS } from './bot.constants';
import { InitUserInput } from 'src/users/dto/init-user.input';

import { UsersService } from 'src/users/users.service';
import { BotNavigationService } from './bot-navigation.service';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly botNavigationService: BotNavigationService,
    private readonly usersService: UsersService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const inline_keyboard = [[]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    await ctx.reply('Welcome', replyMarkup);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await ctx.reply('Hello!');
  }

  // @Hears(MENU_BUTTONS.AREA.text)
  // async handleAreaMenu(@Ctx() ctx: Context) {
  //   await ctx.scene.enter(AREA_SCENE);
  //   return;
  // }
}
