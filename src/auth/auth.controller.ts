import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { SigninUserDto } from './dtos/login-user-dto';
import { RefreshTokenDto } from './dtos/refresh-token-dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    await this.authService.signup(name, email, password);
    return { message: 'User registered successfully' };
  }

  @Post('/signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;
    const { access_token, refresh_token } = await this.authService.signin(
      email,
      password,
    );
    return {
      message: 'User loggedin successfully',
      access_token,
      refresh_token,
    };
  }

  @Post('refresh-token')
  async rotateRefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { access_token, refresh_token } =
      await this.authService.rotateRefreshToken(refreshTokenDto.refresh_token);
    return {
      message: 'refresh token rotation process is succeeded',
      access_token,
      refreshTokenDto,
    };
  }
}
