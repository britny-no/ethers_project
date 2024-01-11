import { Test, TestingModule } from '@nestjs/testing';
import { IncomingWebhook } from '@slack/webhook';
import { EthersService } from '@App/module/ethers/ethers.service';
import { CronService } from './cron.service';
import { BlockRepository } from '@App/module/block/repository/block.repository';

import {
  MockBlockRepositoryType,
  MockBlockRepositoryProvider,
  MockEthersRepositoryType,
  MockEthersRepositoryProvider,
} from './testFunction';

describe('CronService', () => {
  let cronService: CronService;
  let ethersService: MockEthersRepositoryType;
  let mockBlockRepository: MockBlockRepositoryType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronService,
        MockBlockRepositoryProvider,
        MockEthersRepositoryProvider,
      ],
    }).compile();

    cronService = module.get<CronService>(CronService);
    ethersService = module.get<EthersService>(EthersService);
    mockBlockRepository = module.get<BlockRepository>(BlockRepository);
  });

  it('should be defined', () => {
    expect(cronService).toBeDefined();
  });

  it('에러 발생[최근 블록 넘버를 못가져올때]', async () => {
    // process.env.SLACK_URL설정을 해줘야합니다
    jest
      .spyOn(ethersService, 'getCurrentBlockNumber')
      .mockResolvedValue(Promise.reject(1));

    try {
      await cronService.updateBlock();
    } catch (err) {
      switch (err.status) {
        case 409:
        case 404:
          expect(2).toEqual(1);
          break;
        default:
          expect(err).toEqual(1);
      }
    }
  });

  it('에러 발생[최근 블록 정보를 못가져올때]', async () => {
    // process.env.SLACK_URL설정을 해줘야합니다
    jest
      .spyOn(ethersService, 'getCurrentBlockNumber')
      .mockResolvedValue(Promise.resolve(1));

    jest
      .spyOn(mockBlockRepository, 'checkBlockDuplicate')
      .mockResolvedValue(Promise.resolve(1));

    jest.spyOn(ethersService, 'getBlock').mockResolvedValue(null);

    try {
      await cronService.updateBlock();
    } catch (err) {
      switch (err.status) {
        case 409:
        case 404:
          expect(err.code).toEqual('NO_BLOCKINFO');
          break;
        default:
          expect(2).toEqual(1);
      }
    }
  });
});
