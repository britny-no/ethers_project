import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { BlockEntity } from '../entity/block.entity';

import { CreateBlockReqInterface } from '../interface/request/createBlock.interface';
import { GetBlocksReqInterface } from '../interface/request/getBlocks.interface';
import { GetBlocksResInterface } from '../interface/response/getBlocks.interface';
import { GetBlockHashListResInterface } from '../interface/response/getBlockHashList.interface';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(BlockEntity)
export class BlockRepository extends Repository<BlockEntity> {
  async checkBlockDuplicate(blockNumber: number) {
    try {
      const selectResult = await this.findOne({
        where: {
          blockNumber,
        },
      });

      if (selectResult) {
        throw { code: 'DUPLICATE_REQUEST' };
      } else {
        return true;
      }
    } catch (err) {
      switch (err.code) {
        case 'DUPLICATE_REQUEST':
          throw new CommonErrorException(
            {
              errorCode: ErrorCodeEnum.SERVER_ERROR,
              detailCode: DetailCodeEnum.DUPLICATE_REQUEST,
            },
            409,
          );
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async createBlock(data: CreateBlockReqInterface): Promise<string> {
    try {
      await this.save(data);
      return 'success';
    } catch (err) {
      switch (err.code) {
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getBlockHashList(): Promise<GetBlockHashListResInterface> {
    try {
      const [arr, count] = await this.findAndCount({
        select: {
          blockHash: true,
        },
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

  async getBlocks(data: GetBlocksReqInterface): Promise<GetBlocksResInterface> {
    try {
      const [arr, count] = await this.findAndCount({
        where: {
          blockHash: data.blockHash,
        },
        relations: ['transactions', 'transactions.logs'],
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

  async getBlockCount() {
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
