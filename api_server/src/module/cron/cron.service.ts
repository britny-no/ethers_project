import { Injectable, Inject, UseFilters } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger as WinstonLogger } from 'winston';
import { IncomingWebhook } from '@slack/webhook';

import { BlockRepository } from '@App/module/block/repository/block.repository';
import { EthersService } from '@App/module/ethers/ethers.service';

@Injectable()
export class CronService {
  private webhook = new IncomingWebhook(process.env.SLACK_URL);
  constructor(
    private ethersService: EthersService,
    private blockRepository: BlockRepository, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  //cron 환경에서 useFilter 사용 불가?
  @Interval('getCurrntBlock', 60 * 5 * 1000)
  async updateBlock() {
    try {
      const blockNumber = await this.ethersService.getCurrentBlockNumber();
      await this.blockRepository.checkBlockDuplicate(blockNumber);

      const blockInfo = await this.ethersService.getBlock(blockNumber);
      // api traffic Limit으로 10개 transaction만 조회
      if (!blockInfo) {
        throw { status: 404, code: 'NO_BLOCKINFO' };
      }
      const promiseArr = blockInfo.transactions.slice(0, 10).map((hash) => {
        return new Promise((resolve, reject) => {
          this.ethersService
            .getTransactionReceipt(hash)
            .then((res) =>
              resolve({
                trHash: res.hash,
                blockHash: res.blockHash,
                contractAddress: res.contractAddress,
                gasPrice: res.gasPrice,
                from: res.from,
                to: res.to,
                logs: res.logs.map((log) => ({
                  trHash: log.transactionHash,
                  blockHash: log.blockHash,
                  address: log.address || null,
                  data: log.data || null,
                })),
              }),
            )
            .catch((err) => {
              // 에러 발생한 건도, trHash/blockHash만 등록
              resolve({
                trHash: hash,
                blockHash: blockInfo.hash,
                contractAddress: null,
                gasPrice: null,
                from: null,
                to: null,
                logs: [],
              });
            });
        });
      });
      const transactionReceipts = await Promise.all(promiseArr);
      // block, transaction넣을때, log도 같이
      // data간 coupling 고려해도, 정합성과 개발 속도 고려해 save 사용
      return await this.blockRepository.createBlock({
        blockHash: blockInfo.hash,
        blockNumber: blockInfo.number,
        difficulty: blockInfo.difficulty || null,
        gasUsed: blockInfo.gasUsed || null,
        miner: blockInfo.miner || null,
        timestamp: blockInfo.timestamp || null,
        transactions: transactionReceipts,
      });
    } catch (err) {
      switch (err.status) {
        case 409:
        case 404:
          // 이미 존재하는 경우
          // blockinfo 정보가 없는 경우
          break;
        default:
          this.webhook.send({
            attachments: [
              {
                color: 'danger',
                text: `🚨slack-bot 에러발생🚨`,
                fields: [
                  {
                    title: err.errorCode,
                    value: JSON.stringify(err),
                    short: false,
                  },
                ],
                ts: Math.floor(new Date().getTime() / 1000).toString(),
              },
            ],
          });
      }
    }
  }
}
