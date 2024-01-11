import { Injectable, Inject } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger as WinstonLogger } from 'winston';
import { IncomingWebhook } from '@slack/webhook';

import { BlockRepository } from '@App/module/block/repository/block.repository';
import { LogRepository } from '@App/module/log/repository/log.repository';
import { TransactionRepository } from '@App/module/transaction/repository/transaction.repository';

@Injectable()
export class SlackBotService {
  private webhook = new IncomingWebhook(process.env.SLACK_URL);
  constructor(
    private BlockRepository: BlockRepository,
    private LogRepository: LogRepository,
    private TransactionRepository: TransactionRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  @Interval('getDataCount', 60 * 5 * 1000)
  async getDataCount() {
    try {
      const blockCount = await this.BlockRepository.getBlockCount();
      const transactionCount =
        await this.TransactionRepository.getTransactionCount();
      const logCount = await this.LogRepository.getLogCount();
      this.webhook.send({
        attachments: [
          {
            color: 'info',
            text: `데이터 개수 보고`,
            fields: [
              {
                title: '데이터 개수 보고',
                value: `block: ${blockCount}, tr:${transactionCount}, log:${logCount}`,
                short: false,
              },
            ],
            ts: Math.floor(new Date().getTime() / 1000).toString(),
          },
        ],
      });
    } catch (err) {
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

  @Interval('reportOperation', 60 * 60 * 1000)
  async reportOperation() {
    try {
      this.webhook.send({
        attachments: [
          {
            color: 'info',
            text: `서버 운영중`,
            fields: [
              {
                title: `서버 운영중`,
                value: `server is running`,
                short: false,
              },
            ],
            ts: Math.floor(new Date().getTime() / 1000).toString(),
          },
        ],
      });
    } catch (err) {
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
