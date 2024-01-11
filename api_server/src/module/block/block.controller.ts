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

import { GetBlockHashListResDto } from './dto/response/getBlockHashList.dto';
import { GetBlocksReqDto } from './dto/request/getBlocks.dto';
import { GetBlocksResDto } from './dto/response/getBlocks.dto';
import { BlockService } from '@App/module/block/block.service';

import { ApiCommonResponse } from '@App/decorator/apiCommon.decorator';
import { ResponseFormatInterceptor } from '@App/interceptor/responseFormat.interceptor';
import { QueryErrorResponseFilter } from '@App/filter/queryErrorResponse.filter';
import { CommonErrorResponseFilter } from '@App/filter/commonErrorResponse.filter';
import { ValidationErrorResponseFilter } from '@App/filter/validationErrorResponse.filter';

@Controller('block')
@ApiTags('BLOCK API')
export class BlockController {
  constructor(private blockService: BlockService) {}

  @ApiOperation({
    summary: 'block hash 조회 API',
    description: 'block hash 조회',
  })
  @ApiExtraModels(GetBlockHashListResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetBlockHashListResDto),
  })
  @Get('/block-hash-list')
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getBlockHashList(): Promise<GetBlockHashListResDto> {
    try {
      const list = await this.blockService.getBlockHashList();
      const result = plainToInstance(GetBlockHashListResDto, list);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: 'block 조회 API',
    description: 'block 조회 by block hash',
  })
  @ApiExtraModels(GetBlocksResDto)
  @ApiCommonResponse({
    $ref: getSchemaPath(GetBlocksResDto),
  })
  @Get('/blocks')
  @UseFilters(
    ValidationErrorResponseFilter,
    CommonErrorResponseFilter,
    QueryErrorResponseFilter,
  )
  @UseInterceptors(ResponseFormatInterceptor)
  async getBlocks(@Query() query: GetBlocksReqDto): Promise<GetBlocksResDto> {
    try {
      const list = await this.blockService.getBlocks(query);
      const result = plainToInstance(GetBlocksResDto, list);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
