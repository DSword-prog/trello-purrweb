import { User } from './entities/users.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { ColumnsModule } from '../columns/columns.module';
import { CommentModule } from '../comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.AT_SECRET }),
    forwardRef(() => ColumnsModule),
    forwardRef(() => CommentModule),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
