import { Gender } from '../../common/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  readonly id: string;

  @ApiProperty({ example: 'example@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'John' })
  readonly name: string;

  @ApiProperty({ example: 'Doe' })
  readonly surname: string;

  @ApiProperty({ example: 'MALE' })
  readonly gender: Gender;
}
