import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';
import { TelegrafModule } from 'nestjs-telegraf';

import { botMiddleware } from './bot.middleware';

import { UsersService } from 'src/users/users.service';
import { BotNavigationService } from './bot-navigation.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [botMiddleware],
        include: [BotModule],
      }),
    }),
  ],
  providers: [
    BotResolver,
    BotListener,
    BotService,
    UsersService,
    BotNavigationService,
    BotUpdate,
  ],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule {}
