import * as path from 'node:path';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { getPostgresConfig } from './src/helpers/get-postgres-config';

config({ path: [path.join(process.cwd(), '.env'), path.join(process.cwd(), '..', '..', '.env')] });
const configService = new ConfigService();

const databaseConfig = getPostgresConfig(configService);

const appDataSource = new DataSource({
  ...databaseConfig,
  entities: [path.join(process.cwd(), 'apps', 'identity', 'src', 'domains', 'user', 'entities', '*.ts')],
  migrations: [
    path.join(process.cwd(), 'apps', 'identity', 'migrations', '*.js'),
    path.join(process.cwd(), 'migrations', '*.js'),
  ],
});

export default appDataSource;
