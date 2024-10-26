import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptjsModule } from 'src/bcryptjs/bcryptjs.module';
import { jwtModuleAsyncOptions } from '../common/configs/jwt.config';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    UsersModule,
    BcryptjsModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    ConfigModule.forRoot(),
    RedisModule.forRoot(),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
