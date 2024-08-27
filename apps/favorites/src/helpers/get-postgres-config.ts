import * as path from 'node:path';
import * as process from 'node:process';

import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const getPostgresConfig = (configService: ConfigService): DataSourceOptions => {
  const type = 'postgres';
  const host = configService.get('FAVORITES_POSTGRES_HOST');
  const port = configService.get('FAVORITES_POSTGRES_PORT');
  const user = configService.get('FAVORITES_POSTGRES_USER');
  const password = configService.get('FAVORITES_POSTGRES_PASSWORD');
  const database = configService.get('FAVORITES_POSTGRES_DB');
  const connectionUrl = `${type}://${user}:${password}@${host}:${port}/${database}`;
  return {
    type,
    url: connectionUrl,
    migrations: [
      path.join(process.cwd(), 'apps', 'favorites', 'migrations', '*.js'),
      path.join(process.cwd(), 'migrations', '*.js'),
    ],
    synchronize: false,
  };
};
