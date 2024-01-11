import { Expose, Type, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class BlockHash {
  @ApiProperty({ name: 'block_hash', description: '블록 해쉬' })
  @Expose({ name: 'blockHash' })
  block_hash: string;
}

@Exclude()
export class GetBlockHashListResDto {
  @ApiProperty({
    name: 'data',
    description: '해쉬 값',
    type: () => BlockHash,
  })
  @Type(() => BlockHash)
  @Expose({ name: 'data' })
  data: BlockHash[];

  @ApiProperty({ name: 'msg', description: '메세지' })
  @Expose({ name: 'msg' })
  msg: string;
}
