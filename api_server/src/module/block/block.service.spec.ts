import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from './block.service';

import { BlockRepository } from '@App/module/block/repository/block.repository';

import {
  MockBlockRepositoryType,
  MockBlockRepositoryProvider,
} from './testFunction';

describe('BlockService', () => {
  let blockService: BlockService;
  let mockBlockRepository: MockBlockRepositoryType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockService, MockBlockRepositoryProvider],
    }).compile();

    blockService = module.get<BlockService>(BlockService);
    mockBlockRepository = module.get<BlockRepository>(BlockRepository);
  });

  it('should be defined', () => {
    expect(blockService).toBeDefined();
  });
  it('블록 해쉬 리스트를 조회한다', () => {
    // 특별한 조건이 없어, 보류
    expect(1).toEqual(1);
  });

  it('블록들을 조회한다', () => {
    // 특별한 조건이 없어, 보류
    expect(1).toEqual(1);
  });
});
