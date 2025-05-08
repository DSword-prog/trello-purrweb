import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ColumnsService } from '../../columns/services/columns.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private columnService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { id: string };
    const columnId = req.params.id;

    const column = await this.columnService.findOne(columnId);
    if (!column) throw new ForbiddenException('Column not found');
    if (column.user.id !== user.id)
      throw new ForbiddenException('Access denied to this column');

    return true;
  }
}
