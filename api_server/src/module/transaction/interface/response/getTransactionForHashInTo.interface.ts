import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

export interface GetTransactionForHashInToResInterface {
  data: TransactionEntity[];
  msg: string;
}
