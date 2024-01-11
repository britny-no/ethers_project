import { ConfigModule, ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Provider, Wallet, getDefaultProvider } from 'ethers';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';

@Injectable()
export class EthersService {
  private provider: any = null;

  constructor(private configService: ConfigService) {
    this.provider = getDefaultProvider(
      configService.get<string>('BLOCK_NETWORK', 'dev'),
      {
        infura: configService.get<string>('BLOCK_API_KEY', 'dev'),
      },
    );
  }

  async getCurrentBlockNumber() {
    try {
      // return mined block number
      return await this.provider.getBlockNumber();
    } catch (err) {
      throw new CommonErrorException(
        {
          errorCode: ErrorCodeEnum.SERVER_ERROR,
          detailCode: 'getCurrentBlockNumber Error',
        },
        500,
      );
    }
  }

  async getBlock(blockNumber: number) {
    try {
      // prefetchedTransactions, getBlockWith, getBlockWithTransactions 안되서 transactions로 일일이 확인
      return await this.provider.getBlock(blockNumber);
    } catch (err) {
      throw new CommonErrorException(
        {
          errorCode: ErrorCodeEnum.SERVER_ERROR,
          detailCode: 'getBlock Error',
        },
        500,
      );
    }
  }

  async getTransactionReceipt(hash: string) {
    try {
      return await this.provider.getTransactionReceipt(hash);
    } catch (err) {
      throw new CommonErrorException(
        {
          errorCode: ErrorCodeEnum.SERVER_ERROR,
          detailCode: 'getTransactionReceipt Error',
        },
        500,
      );
    }
  }
}
