import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentResponse } from '../responses/comment.response';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UserService } from '../../users/services/users.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<CommentResponse[]> {
    return this.commentRepository.find();
  }

  async findOne(id: string): Promise<CommentResponse> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async create(dto: CreateCommentDto, userId: string) {
    const user = await this.userService.findOne(userId);
    const comment = this.commentRepository.create({
      ...dto,
      user,
    });
    return this.commentRepository.save(comment);
  }

  async update(id: string, dto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment)
      throw new NotFoundException(`Comment with ID ${id} not found`);
    const updated = Object.assign(comment, dto);
    return this.commentRepository.save(updated);
  }

  async delete(id: string) {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
