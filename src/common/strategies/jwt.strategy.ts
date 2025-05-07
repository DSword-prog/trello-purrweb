import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'node:process';
import { UserService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AT_SECRET,
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException('User no longer exists');
    return { id: user.id };
  }
}
