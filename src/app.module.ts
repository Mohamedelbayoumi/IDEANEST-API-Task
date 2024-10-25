import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongooseModuleAsyncOptions } from './common/configs/mongoose.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    AuthModule,
  ],
})
export class AppModule {}
