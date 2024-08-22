import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

export const getRedisConfig = (configService: ConfigService): RedisModuleOptions => {
  const host = configService.get<string>('IDENTITY_REDIS_HOST');
  const port = configService.get<number>('IDENTITY_REDIS_PORT');
  const dbNumber = parseInt(configService.get<string>('IDENTITY_REDIS_DB'), 10);
  return {
    type: 'single',
    options: { host, port, db: dbNumber },
  };
};
