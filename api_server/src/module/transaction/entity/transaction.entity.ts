import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { BlockEntity } from '@App/module/block/entity/block.entity';
import { LogEntity } from '@App/module/log/entity/log.entity';
@Entity({ name: 'TRANSACTION' })
export class TransactionEntity extends BaseEntity {
  @PrimaryColumn({ type: 'text', nullable: false, name: 'tr_hash' })
  trHash: string;

  @Column({ type: 'text', nullable: false, name: 'block_hash' })
  @JoinColumn()
  blockHash: string;

  @Column({ type: 'text', nullable: true, name: 'contract_address' })
  contractAddress: string;

  @Column({ type: 'text', nullable: true })
  difficulty: string;

  @Column({ type: 'text', nullable: true, name: 'gas_price' })
  gasPrice: string;

  @Column({ type: 'text', nullable: true })
  from: string;

  @Column({ type: 'text', nullable: true })
  to: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;

  @ManyToOne((type) => BlockEntity, (block) => block.transactions)
  block!: BlockEntity;

  @OneToMany((type) => LogEntity, (log) => log.transaction, {
    cascade: ['insert'],
  })
  logs!: LogEntity[];
}
