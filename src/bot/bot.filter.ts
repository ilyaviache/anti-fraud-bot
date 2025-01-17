import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from './bot.interface';
import * as Sentry from "@sentry/node";

@Catch()
export class BotFilter implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<Context>();

    Sentry.captureException(exception);

    await ctx.replyWithHTML(`<b>Error</b>: ${exception.message}`);
  }
}
