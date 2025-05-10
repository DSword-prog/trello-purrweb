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

@UseGuards(AuthGuard('jwt'))
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Post()
  async create(@Body() dto: CreateColumnDto, @CurrentUser() user) {
    return this.columnService.create(dto, user.id);
  }

  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.findOne(id);
  }

  @UseGuards(ColumnOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.update(id, dto);
  }

  @UseGuards(ColumnOwnerGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.delete(id);
  }
}
