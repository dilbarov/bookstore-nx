import { AmqpModule, BOOK_EXCHANGES, EnvironmentsModule } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { DomainsModule } from '../../../identity/src/domains/domains.module';

@Module({
  imports: [EnvironmentsModule, AmqpModule.forRoot(BOOK_EXCHANGES), DomainsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
