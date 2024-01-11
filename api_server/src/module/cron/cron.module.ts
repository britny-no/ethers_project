import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { BlockRepository } from '@App/module/block/repository/block.repository';

import { CronService } from './cron.service';
import { EthersModule } from '@App/module/ethers/ethers.module';

@Module({
  imports: [
    EthersModule,
    TypeOrmExModule.forCustomRepository([BlockRepository]),
  ],
  providers: [CronService],
})
export class CronModule {}
