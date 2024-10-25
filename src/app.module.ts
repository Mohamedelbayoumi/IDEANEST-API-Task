import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongooseModuleAsyncOptions } from './common/configs/mongoose.config';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    AuthModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
