import { ColumnsService } from '../services/columns.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateColumnDto } from '../dto/create-column.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateColumnDto, @CurrentUser() user) {
    return this.columnService.create(dto, user.id);
  }
}
