import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';
@Entity({ name: 'BLOCK' })
export class BlockEntity extends BaseEntity {
  @PrimaryColumn({ type: 'text', nullable: false, name: 'block_hash' })
  blockHash: string;

  @Column({ type: 'int', nullable: false, name: 'block_number' })
  blockNumber: number;

  @Column({ type: 'text', nullable: true })
  difficulty: string;

  @Column({ type: 'text', nullable: true, name: 'gas_used' })
  gasUsed: string;

  @Column({ type: 'text', nullable: true })
  miner: string;

  @Column({ type: 'text', nullable: true })
  timestamp: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;

  @OneToMany((type) => TransactionEntity, (tr) => tr.block, {
    cascade: ['insert'],
  })
  transactions!: TransactionEntity[];
}
