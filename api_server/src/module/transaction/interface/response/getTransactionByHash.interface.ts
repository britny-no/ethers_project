import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

export interface GetTransactionByHashResInterface {
  data: TransactionEntity[];
  msg: string;
}
