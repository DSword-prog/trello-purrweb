import { ColumnsService } from '../services/columns.service';
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
import { AuthGuard } from '@nestjs/passport';
import { CreateColumnDto } from '../dto/create-column.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { ColumnOwnerGuard } from '../../common/guards/column-owner.guard';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateColumnDto, @CurrentUser() user) {
    return this.columnService.create(dto, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), ColumnOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), ColumnOwnerGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.delete(id);
  }
}
