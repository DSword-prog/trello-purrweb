import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;
}
