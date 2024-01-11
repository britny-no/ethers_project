import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './module/cron/cron.module';
import { EthersModule } from './module/ethers/ethers.module';
import { WinstonConfig } from '@App/util/winston.util';
import { SlackBotModule } from './module/slack-bot/slack-bot.module';

import { EnvConfig, DbConfig } from '@App/config/index';
import { BlockModule } from './module/block/block.module';
import { TransactionModule } from './module/transaction/transaction.module';

@Module({
  imports: [
    EnvConfig,
    DbConfig,
    WinstonConfig,
    ScheduleModule.forRoot(),
    CronModule,
    EthersModule,
    BlockModule,
    TransactionModule,
    SlackBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
