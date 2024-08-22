import path from 'node:path';
import process from 'node:process';

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.join(process.cwd(), '.env'), path.join(process.cwd(), '..', '..', '.env')],
    }),
  ],
})
export class EnvironmentsModule {}
