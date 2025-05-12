import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CommentService } from '../../comments/services/comment.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { id: string };
    const commentId = req.params.id;

    const comment = await this.commentService.findOne(commentId);
    if (!comment) throw new ForbiddenException('Comment not found');
    if (comment.user.id !== user.id)
      throw new ForbiddenException('Access denied to this comment');

    return true;
  }
}
