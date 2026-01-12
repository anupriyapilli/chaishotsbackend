import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../programs/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  test() {
    return { message: 'auth ok' };
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
