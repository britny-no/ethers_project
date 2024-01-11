import { getRepositoryToken } from '@nestjs/typeorm';
import { BlockRepository } from '@App/module/block/repository/block.repository';
import { EthersService } from '@App/module/ethers/ethers.service';

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

const MockEthersService = {
  getBlock: jest.fn(),
  getCurrentBlockNumber: jest.fn(),
};

export type MockEthersRepositoryType =
  | Partial<Record<keyof EthersService, jest.Mock>>
  | Partial<EthersService>;

export const MockEthersRepositoryProvider = {
  provide: EthersService,
  useValue: MockEthersService,
};
