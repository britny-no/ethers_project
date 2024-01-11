import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { LogEntity } from '../entity/log.entity';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(LogEntity)
export class LogRepository extends Repository<LogEntity> {
  async getLogCount() {
    try {
      const [arr, count] = await this.findAndCount();

      return count;
    } catch (err) {
      switch (err.code) {
        default:
          throw new QueryErrorException(err);
      }
    }
  }
}
