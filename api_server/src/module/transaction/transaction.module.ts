import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { TransactionRepository } from './repository/transaction.repository';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([TransactionRepository])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
