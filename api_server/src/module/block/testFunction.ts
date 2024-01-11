import { getRepositoryToken } from '@nestjs/typeorm';
import { BlockRepository } from '@App/module/block/repository/block.repository';

const MockBlockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),

  checkBlockDuplicate: BlockRepository.prototype.checkBlockDuplicate,
  createBlock: BlockRepository.prototype.createBlock,
  getBlocks: BlockRepository.prototype.getBlocks,
  getBlockHashList: BlockRepository.prototype.getBlockHashList,
};

export type MockBlockRepositoryType =
  | Partial<Record<keyof BlockRepository, jest.Mock>>
  | Partial<BlockRepository>;

export const MockBlockRepositoryProvider = {
  provide: getRepositoryToken(BlockRepository),
  useValue: MockBlockRepository,
};
