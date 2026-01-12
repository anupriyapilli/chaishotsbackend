import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret-key', // same as in JwtModule.register
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
  console.log('JWT payload', payload);
  return payload;
}

}
