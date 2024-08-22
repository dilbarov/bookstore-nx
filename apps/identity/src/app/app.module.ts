import { Module } from '@nestjs/common';
import { DomainsModule } from '../domains/domains.module';
import { AmqpModule, EnvironmentsModule, EXCHANGE_USER, TypeormModule } from '@bookstore-nx/microservices';
import { UserEntity } from '../domains/user/entities/user.entity';
import { getPostgresConfig } from '../helpers/get-postgres-config';

@Module({
  imports: [
    EnvironmentsModule,
    AmqpModule.forRoot([EXCHANGE_USER]),
    TypeormModule.forRoot({
      entities: [UserEntity],
      getConfig: getPostgresConfig,
    }),
    DomainsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
