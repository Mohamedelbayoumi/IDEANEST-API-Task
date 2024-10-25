import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongooseModuleAsyncOptions } from './common/configs/mongoose.config';

@Module({
  imports: [MongooseModule.forRootAsync(mongooseModuleAsyncOptions)],
})
export class AppModule {}
