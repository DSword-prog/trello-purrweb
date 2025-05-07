import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from '../entities/columns.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UserService } from '../../users/services/users.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateColumnDto, userId: string) {
    const user = await this.userService.findOne(userId);
    const column = this.columnRepository.create({
      ...dto,
      user,
    });
    return this.columnRepository.save(column);
  }
}
