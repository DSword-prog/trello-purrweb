import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_archived?: boolean;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  column_id: string;
}
