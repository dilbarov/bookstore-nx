import { EnvironmentsModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '../shared/providers/providers.module';
import { ApiModule } from '../api-modules/api.module';

@Module({
  imports: [EnvironmentsModule, ProvidersModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
