import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { Repository } from 'typeorm';
import { CardResponse } from '../responses/card.response';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<CardResponse[]> {
    return this.cardRepository.find();
  }

  async findOne(id: string): Promise<CardResponse> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['column'],
    });
    if (!card) throw new NotFoundException(`Card with ID ${id} not found`);
    return card;
  }

  async create(dto: CreateCardDto) {
    const card = this.cardRepository.create({
      ...dto,
      column: { id: dto.column_id }, // ← ключевой момент
    });
    return this.cardRepository.save(card);
  }

  async update(id: string, dto: UpdateCardDto) {
    const card = this.cardRepository.findOne({ where: { id } });
    if (!card) throw new NotFoundException(`Card with ID ${id} not found`);
    const updated = Object.assign(card, dto);
    return this.cardRepository.save(updated);
  }

  async delete(id: string) {
    const result = await this.cardRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Card with ID ${id} not found`);
  }

  async findWithColumnAndUser(id: string) {
    return this.cardRepository.findOne({
      where: { id },
      relations: ['column', 'column.user'],
    });
  }

  async getCardsByColumnId(columnId: string): Promise<Card[]> {
    return this.cardRepository.find({ where: { column: { id: columnId } } });
  }
}
