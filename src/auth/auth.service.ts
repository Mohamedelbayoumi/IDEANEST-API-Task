import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';
import { BcryptjsService } from '../bcryptjs/bcryptjs.service';
import { IPayload } from './interfaces/payload.interface';

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

    return await this.issueTokens(payload);
  }

  async rotateRefreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.refreshTokenSecret,
    });

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const subPaylod = {
      sub: payload.sub as string,
    };

    return await this.issueTokens(subPaylod);
  }

  private refreshTokenSecret: string = this.configService.get(
    'REFRESH_TOKEN_SECRET_KEY',
  );

  private async issueTokens(payload: IPayload) {
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: '2 days',
      }),
    };
  }
}
