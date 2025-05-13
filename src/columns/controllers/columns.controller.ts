import { ColumnsService } from '../services/columns.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateColumnDto } from '../dto/create-column.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { ColumnOwnerGuard } from '../../common/guards/column-owner.guard';
import { User } from '../../users/entities/users.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ColumnsResponse } from '../responses/columns.response';
import { CardService } from '../../cards/services/card.service';
import { CardResponse } from '../../cards/responses/card.response';

@UseGuards(AuthGuard('jwt'))
@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnService: ColumnsService,
    private readonly cardService: CardService,
  ) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ description: 'Create column data', type: CreateColumnDto })
  @ApiCreatedResponse({ type: ColumnsResponse })
  async create(@Body() dto: CreateColumnDto, @CurrentUser() user: User) {
    return this.columnService.create(dto, user.id);
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [ColumnsResponse] })
  async findAll() {
    return this.columnService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ColumnsResponse })
  @ApiNotFoundResponse({ description: 'Column not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/cards')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Column cards returned successfully',
    type: [CardResponse],
  })
  async getColumnCards(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.getCardsByColumnId(id);
  }

  @UseGuards(ColumnOwnerGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ description: 'Update column data', type: UpdateColumnDto })
  @ApiOkResponse({ type: ColumnsResponse })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.update(id, dto);
  }

  @UseGuards(ColumnOwnerGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Column deleted successfully' })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.delete(id);
  }
}
