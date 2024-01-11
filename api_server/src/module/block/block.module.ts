import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { BlockRepository } from '@App/module/block/repository/block.repository';

import { BlockController } from './block.controller';
import { BlockService } from './block.service';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([BlockRepository])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
