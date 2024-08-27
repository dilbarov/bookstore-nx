import { EnvironmentsModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiModule } from '../api-modules/api.module';
import { ProvidersModule } from '../shared/providers/providers.module';

@Module({
  imports: [EnvironmentsModule, ProvidersModule, JwtModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
