import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CardService } from '../../cards/services/card.service';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { id: string };
    const cardId = req.params.id;

    const card = await this.cardService.findWithColumnAndUser(cardId);
    if (!card) throw new ForbiddenException('Card not found');
    if (card.column.user.id !== user.id)
      throw new ForbiddenException('Access denied to this card');
    return true;
  }
}
