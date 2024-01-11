import { Injectable } from '@nestjs/common';

import { BlockRepository } from '@App/module/block/repository/block.repository';

import { GetBlocksReqInterface } from './interface/request/getBlocks.interface';
import { GetBlocksResInterface } from './interface/response/getBlocks.interface';

@Injectable()
export class BlockService {
  constructor(private blockRepository: BlockRepository) {}

  async getBlockHashList() {
    try {
      return await this.blockRepository.getBlockHashList();
    } catch (err) {
      throw err;
    }
  }

  async getBlocks(data: GetBlocksReqInterface): Promise<GetBlocksResInterface> {
    try {
      return await this.blockRepository.getBlocks(data);
    } catch (err) {
      throw err;
    }
  }
}
