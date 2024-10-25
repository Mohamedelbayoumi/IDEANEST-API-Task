import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    await this.authService.signup(name, email, password);
    return { message: 'User registered successfully' };
  }
}
