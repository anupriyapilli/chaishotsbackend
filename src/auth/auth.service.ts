import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(dto: { email: string }) {
    const payload = {
      sub: '01d1df11-7575-49f4-b9b1-1798c8a990ef',
      email: dto.email,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return {
      user: {
        id: payload.sub,
        email: payload.email,
      },
      accessToken,
    };
  }
}
