import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

import { GetTransactionByHashReqInterface } from '../interface/request/getTransactionByHash.interface';
import { GetTransactionByHashResInterface } from '../interface/response/getTransactionByHash.interface';
import { GetTransactionForHashInToReqInterface } from '../interface/request/getTransactionForHashInTo.interface';
import { GetTransactionForHashInToResInterface } from '../interface/response/getTransactionForHashInTo.interface';
import { GetTransactionForHashInFromReqInterface } from '../interface/request/getTransactionForHashInFrom.interface';
import { GetTransactionForHashInFromResInterface } from '../interface/response/getTransactionForHashInFrom.interface';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  async getTransactionByHash(
    data: GetTransactionByHashReqInterface,
  ): Promise<GetTransactionByHashResInterface> {
    try {
      const [arr, count] = await this.findAndCount({
        where: {
          trHash: data.trHash,
        },
        relations: ['logs'],
      });
      return {
        data: count === 1 ? [...arr] : arr,
        msg: '조회 완료',
      };
    } catch (err) {
      switch (err.code) {
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getTransactionForHashInTo(
    data: GetTransactionForHashInToReqInterface,
  ): Promise<GetTransactionForHashInToResInterface> {
    try {
      const [arr, count] = await this.findAndCount({
        where: {
          to: data.to,
        },
        relations: ['logs'],
      });
      return {
        data: count === 1 ? [...arr] : arr,
        msg: '조회 완료',
      };
    } catch (err) {
      switch (err.code) {
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getTransactionForHashInFrom(
    data: GetTransactionForHashInFromReqInterface,
  ): Promise<GetTransactionForHashInFromResInterface> {
    try {
      const [arr, count] = await this.findAndCount({
        where: {
          from: data.from,
        },
        relations: ['logs'],
      });
      return {
        data: count === 1 ? [...arr] : arr,
        msg: '조회 완료',
      };
    } catch (err) {
      switch (err.code) {
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getTransactionCount() {
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
