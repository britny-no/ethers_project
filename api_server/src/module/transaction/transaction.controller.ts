import {
  UseGuards,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { GetTransactionByHashReqDto } from './dto/request/getTransactionByHash.dto';
import { GetTransactionByHashResDto } from './dto/response/getTransactionByHash.dto';
import { GetTransactionForHashInToReqDto } from './dto/request/getTransactionForHashInTo.dto';
import { GetTransactionForHashInToResDto } from './dto/response/getTransactionForHashInTo.dto';
import { GetTransactionForHashInFromReqDto } from './dto/request/getTransactionForHashInFrom.dto';
import { GetTransactionForHashInFromResDto } from './dto/response/getTransactionForHashInFrom.dto';

import { TransactionService } from './transaction.service';
import { ApiCommonResponse } from '@App/decorator/apiCommon.decorator';
import { ResponseFormatInterceptor } from '@App/interceptor/responseFormat.interceptor';
import { QueryErrorResponseFilter } from '@App/filter/queryErrorResponse.filter';
import { CommonErrorResponseFilter } from '@App/filter/commonErrorResponse.filter';
import { ValidationErrorResponseFilter } from '@App/filter/validationErrorResponse.filter';

@Controller('transaction')
@ApiTags('TRANSACTION API')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'transaction 조회 By Hash API',
    description: 'transaction hash로 transaction 조회',
  })
  @ApiExtraModels(GetTransactionByHashResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetTransactionByHashResDto),
  })
  @Get('/transaction-by-hash')
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getTransactionByHash(
    @Query() query: GetTransactionByHashReqDto,
  ): Promise<GetTransactionByHashResDto> {
    try {
      const list = await this.transactionService.getTransactionByHash(query);
      const result = plainToInstance(GetTransactionByHashResDto, list);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: 'transaction for hash  in to 조회 API',
    description: 'to와 매칭되는 transaction hash 조회',
  })
  @ApiExtraModels(GetTransactionForHashInToResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetTransactionForHashInToResDto),
  })
  @Get('/transaction-for-hash-in-to')
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getTransactionForHashInTo(
    @Query() query: GetTransactionForHashInToReqDto,
  ): Promise<GetTransactionForHashInToResDto> {
    try {
      const list = await this.transactionService.getTransactionForHashInTo(
        query,
      );
      const result = plainToInstance(GetTransactionForHashInToResDto, list);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: 'transaction for hash  in from 조회 API',
    description: 'from과 매칭되는 transaction hash 조회',
  })
  @ApiExtraModels(GetTransactionForHashInFromResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetTransactionForHashInFromResDto),
  })
  @Get('/transaction-for-hash-in-from')
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getTransactionForHashInFrom(
    @Query() query: GetTransactionForHashInFromReqDto,
  ): Promise<GetTransactionForHashInFromResDto> {
    try {
      const list = await this.transactionService.getTransactionForHashInFrom(
        query,
      );
      const result = plainToInstance(GetTransactionForHashInFromResDto, list);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
