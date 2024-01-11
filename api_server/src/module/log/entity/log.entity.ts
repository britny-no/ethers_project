import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

@Entity({ name: 'LOG' })
export class LogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'log_index' })
  logIndex: string;

  @Column({ type: 'text', nullable: false, name: 'tr_hash' })
  @JoinColumn()
  trHash: string;

  @Column({ type: 'text', nullable: false, name: 'block_hash' })
  blockHash: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  data: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;

  @ManyToOne((type) => TransactionEntity, (tr) => tr.logs)
  transaction!: TransactionEntity;
}
