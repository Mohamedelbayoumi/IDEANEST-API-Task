import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';
import { BcryptjsService } from '../bcryptjs/bcryptjs.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptjsService: BcryptjsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user) {
      throw new ConflictException('User Already existed');
    }

    const hashedPassword = await this.bcryptjsService.hashPassword(password);

    await this.usersService.create(name, email, hashedPassword);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is invalid');
    }

    const comparisonResult = await this.bcryptjsService.comparePasswords(
      password,
      user.password,
    );

    if (!comparisonResult) {
      throw new UnauthorizedException('password is invalid');
    }

    const payload = {
      sub: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '2 days',
      }),
    };
  }
}
