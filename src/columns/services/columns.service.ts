import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from '../entities/columns.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UserService } from '../../users/services/users.service';
import { ColumnsResponse } from '../responses/columns.response';
import { UpdateColumnDto } from '../dto/update-column.dto';

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

  async findAll(): Promise<ColumnsResponse[]> {
    return this.columnRepository.find();
  }

  async findOne(id: string): Promise<ColumnsResponse> {
    return this.columnRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateColumnDto) {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    const updated = Object.assign(column, dto);
    return this.columnRepository.save(updated);
  }

  async delete(id: string) {
    const result = await this.columnRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
  }

  async getColumnsByUserId(userId: string): Promise<ColumnEntity[]> {
    return this.columnRepository.find({
      where: { user: { id: userId } },
    });
  }
}
