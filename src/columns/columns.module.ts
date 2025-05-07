import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/columns.entity';
import { ColumnsService } from './services/columns.service';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ColumnsController } from './controllers/columns.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity]), UsersModule],
  providers: [ColumnsService, JwtStrategy],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}
