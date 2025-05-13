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
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/users.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentOwnerGuard } from 'src/common/guards/comment-owner.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentResponse } from '../responses/comment.response';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [CommentResponse] })
  async findAll() {
    return this.commentService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CommentResponse })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ description: 'Create comment data', type: CreateCommentDto })
  @ApiCreatedResponse({ type: CommentResponse })
  async create(@Body() dto: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentService.create(dto, user.id);
  }

  @UseGuards(CommentOwnerGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ description: 'Update comment data', type: UpdateCommentDto })
  @ApiOkResponse({ type: CommentResponse })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, dto);
  }

  @UseGuards(CommentOwnerGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Comment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.delete(id);
  }
}
