import { IsBoolean, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  title: string;

  @IsBoolean()
  is_archived?: boolean;
}
