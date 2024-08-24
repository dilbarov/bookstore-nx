import { EnvironmentsModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';

import { ResolversModule } from '../resolvers/resolvers.module';
import { ProvidersModule } from '../shared/providers/providers.module';

@Module({
  imports: [EnvironmentsModule, ProvidersModule, ResolversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
