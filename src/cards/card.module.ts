import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { forwardRef, Module } from '@nestjs/common';
import { ColumnsModule } from '../columns/columns.module';
import { CardService } from './services/card.service';
import { CardController } from './controllers/card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => ColumnsModule)],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
