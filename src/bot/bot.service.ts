import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { InjectBot } from 'nestjs-telegraf';
import { message } from 'telegram/client';

import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService
  ) {}

  async sendBaseMessage(message: any) {
    await this.bot.telegram.sendMessage(message.chatId, message.text);
    return;
  }

  async sendMessage(chatId: string, text: string) {
    await this.bot.telegram.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: [],
      },
    });
    return;
  }
}
