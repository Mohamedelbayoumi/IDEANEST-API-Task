import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('ACCESS_TOKEN_SECRET_KEY'),
    signOptions: { expiresIn: '15m' },
  }),
  inject: [ConfigService],
};
