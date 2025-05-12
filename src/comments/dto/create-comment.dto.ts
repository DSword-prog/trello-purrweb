import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  card_id: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
