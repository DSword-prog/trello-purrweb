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
import { CardService } from '../services/card.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateColumnDto } from '../../columns/dto/update-column.dto';
import { AuthGuard } from '@nestjs/passport';
import { CardOwnerGuard } from 'src/common/guards/card-owner.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CardResponse } from '../responses/card.response';
import { UpdateCardDto } from '../dto/update-card.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
@ApiTags('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [CardResponse] })
  @ApiOperation({ summary: 'Get all cards' })
  async findAll() {
    return this.cardService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CardResponse })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiOperation({ summary: 'Get card by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ description: 'Create card data', type: CreateCardDto })
  @ApiCreatedResponse({ type: CardResponse })
  @ApiOperation({ summary: 'Create card' })
  async create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @UseGuards(CardOwnerGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ description: 'Update card data', type: UpdateCardDto })
  @ApiOkResponse({ type: CardResponse })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOperation({ summary: 'Update card' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.cardService.update(id, dto);
  }

  @UseGuards(CardOwnerGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Card deleted successfully' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOperation({ summary: 'Delete card by ID' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.delete(id);
  }
}
