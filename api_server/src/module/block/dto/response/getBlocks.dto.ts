import { Expose, Type, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BlockEntity } from '@App/module/block/entity/block.entity';

@Exclude()
export class GetBlocksResDto {
  @ApiProperty({
    name: 'data',
    description: '블록 정보(자세한 정보는 엔티티 참고)',
    type: () => BlockEntity,
  })
  @Type(() => BlockEntity)
  @Expose({ name: 'data' })
  data: BlockEntity[];

  @ApiProperty({ name: 'msg', description: '메세지' })
  @Expose({ name: 'msg' })
  msg: string;
}
