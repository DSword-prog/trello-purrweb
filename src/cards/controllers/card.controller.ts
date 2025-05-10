import {
  Body,
  Controller,
  Delete,
  Get,
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

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @UseGuards(CardOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.cardService.update(id, dto);
  }

  @UseGuards(CardOwnerGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.delete(id);
  }
}
