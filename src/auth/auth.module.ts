import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { BcryptjsModule } from 'src/bcryptjs/bcryptjs.module';

@Module({
  imports: [UsersModule, BcryptjsModule],
  providers: [AuthService],
  controllers: [AbortController],
})
export class AuthModule {}
