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
import { UserService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginDto } from '../dto/login.dto';
import { UsersResponse } from '../responses/users.response';
import { AuthGuard } from '@nestjs/passport';
import { ColumnsService } from '../../columns/services/columns.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../entities/users.entity';
import { ColumnEntity } from '../../columns/entities/columns.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly columnService: ColumnsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [UsersResponse] })
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  @ApiOkResponse({ type: UsersResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Get current user' })
  async getMe(@CurrentUser() user: User): Promise<UsersResponse> {
    return this.userService.findOne(user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ description: 'Create user data', type: CreateUserDto })
  @ApiCreatedResponse({ type: UsersResponse })
  @ApiConflictResponse({ description: 'Email is already registered' })
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ description: 'Update user data', type: UpdateUserDto })
  @ApiOkResponse({ type: UsersResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Update user' })
  async update(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Delete user' })
  async delete(@CurrentUser() user: User) {
    return this.userService.delete(user.id);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ description: 'Login data', type: LoginDto })
  @ApiOkResponse({ description: 'JWT token returned successfully' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id/columns')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User columns returned successfully',
    type: [ColumnEntity],
  })
  @ApiOperation({ summary: 'Get user columns' })
  getUserColumns(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnService.getColumnsByUserId(id);
  }
}
