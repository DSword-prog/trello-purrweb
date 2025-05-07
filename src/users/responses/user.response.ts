import { Gender } from '../../common/enums/gender.enum';

export class UserResponse {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly surname: string;
  readonly gender: Gender;
}
