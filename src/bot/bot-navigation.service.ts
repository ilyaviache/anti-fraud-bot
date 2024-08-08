import { Injectable } from '@nestjs/common';
import { Context } from './bot.interface';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class BotNavigationService {
  constructor(private readonly usersService: UsersService) {}

  async start(ctx: Context): Promise<any> {
    // TODO: move from main module file
  }

  async firstTouch(ctx: Context): Promise<any> {
    const inline_keyboard = [[]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    await ctx.reply('Text', replyMarkup);
  }
}
