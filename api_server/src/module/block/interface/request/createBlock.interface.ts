export interface CreateBlockReqInterface {
  blockHash: string;
  blockNumber: number;
  difficulty: string;
  gasUsed: string;
  miner: string;
  timestamp: string;
  transactions: TransactionInterface[];
}

export interface TransactionInterface {
  trHash: string;
  blockHash: string;
  contractAddress: string | null;
  gasPrice: string | null;
  from: string | null;
  to: string | null;
  logs: LogsInterface[];
}

export interface LogsInterface {
  trHash: string;
  blockHash: string;
  address: string | null;
  data: string | null;
}
