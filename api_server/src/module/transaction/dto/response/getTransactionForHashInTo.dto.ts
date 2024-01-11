import { Expose, Type, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';

@Exclude()
export class GetTransactionForHashInToResDto {
  @ApiProperty({
    name: 'data',
    description: '해시 정보들(자세한 정보는 엔티티 참고)',
    type: () => TransactionEntity,
  })
  @Type(() => TransactionEntity)
  @Expose({ name: 'data' })
  data: TransactionEntity[];

  @ApiProperty({ name: 'msg', description: '메세지' })
  @Expose({ name: 'msg' })
  msg: string;
}
