import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_archived?: boolean;
}
