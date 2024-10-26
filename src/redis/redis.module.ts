import {
  Module,
  DynamicModule,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: async (configService: ConfigService) => {
            const redisClient = await createClient({
              url:
                configService.get('REDIS_URI') || 'redis://172.20.176.1:6379',
            })
              .on('error', (err) => {
                console.error(err);
                throw new InternalServerErrorException(err.message);
              })
              .on('connect', () => {
                console.log('connected to redis');
              })
              .connect();
            return redisClient;
          },
          inject: [ConfigService],
        },
      ],
      exports: ['REDIS_CLIENT'],
    };
  }
}
