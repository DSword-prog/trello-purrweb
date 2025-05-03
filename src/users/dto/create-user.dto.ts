import { Gender } from '../../common/enums/gender.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEnum(Gender)
  gender: Gender;
}
