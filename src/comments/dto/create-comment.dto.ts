import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  card_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
