import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './repository/transaction.repository';

import { GetTransactionByHashReqInterface } from './interface/request/getTransactionByHash.interface';
import { GetTransactionByHashResInterface } from './interface/response/getTransactionByHash.interface';
import { GetTransactionForHashInToReqInterface } from './interface/request/getTransactionForHashInTo.interface';
import { GetTransactionForHashInToResInterface } from './interface/response/getTransactionForHashInTo.interface';
import { GetTransactionForHashInFromReqInterface } from './interface/request/getTransactionForHashInFrom.interface';
import { GetTransactionForHashInFromResInterface } from './interface/response/getTransactionForHashInFrom.interface';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async getTransactionByHash(
    data: GetTransactionByHashReqInterface,
  ): Promise<GetTransactionByHashResInterface> {
    try {
      return await this.transactionRepository.getTransactionByHash(data);
    } catch (err) {
      throw err;
    }
  }

  async getTransactionForHashInTo(
    data: GetTransactionForHashInToReqInterface,
  ): Promise<GetTransactionForHashInToResInterface> {
    try {
      return await this.transactionRepository.getTransactionForHashInTo(data);
    } catch (err) {
      throw err;
    }
  }

  async getTransactionForHashInFrom(
    data: GetTransactionForHashInFromReqInterface,
  ): Promise<GetTransactionForHashInFromResInterface> {
    try {
      return await this.transactionRepository.getTransactionForHashInFrom(data);
    } catch (err) {
      throw err;
    }
  }
}
