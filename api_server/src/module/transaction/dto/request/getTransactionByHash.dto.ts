import { Expose, Type, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';

@Exclude()
export class GetTransactionByHashReqDto {
  @ApiProperty({
    name: 'tr_hash',
    description: '트랜잭션 해쉬',
    required: true,
  })
  @Expose({ name: 'tr_hash' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'tr_hash',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'tr_hash',
    },
  })
  trHash: string;
}
