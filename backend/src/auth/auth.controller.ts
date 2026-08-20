import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('guest')
  guestLogin() {
    return {
      user: { id: 'guest', name: 'Guest', role: 'guest' },
      message: 'Guest login successful',
    };
  }
}
