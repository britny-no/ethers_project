import { Module } from '@nestjs/common';
import { SlackBotService } from './slack-bot.service';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { BlockRepository } from '@App/module/block/repository/block.repository';
import { LogRepository } from '@App/module/log/repository/log.repository';
import { TransactionRepository } from '@App/module/transaction/repository/transaction.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      BlockRepository,
      LogRepository,
      TransactionRepository,
    ]),
  ],
  providers: [SlackBotService],
})
export class SlackBotModule {}
