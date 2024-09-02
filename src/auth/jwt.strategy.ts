import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IsMobilePhone } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rtams',
    }); 
  }

  async validate(payload: any) {
    return { userId: payload.sub, mobileNumber:payload.mobileNumber, role: payload.role, id:payload.id};
  }
}
