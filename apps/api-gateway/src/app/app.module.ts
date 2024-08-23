import { EnvironmentsModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '../providers/providers.module';
import { ResolversModule } from '../resolvers/resolvers.module';

@Module({
  imports: [EnvironmentsModule, ProvidersModule, ResolversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
