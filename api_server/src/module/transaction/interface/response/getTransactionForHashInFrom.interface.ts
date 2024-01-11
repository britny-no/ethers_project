import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

export interface GetTransactionForHashInFromResInterface {
  data: TransactionEntity[];
  msg: string;
}
