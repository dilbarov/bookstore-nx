import { AmqpModule, EnvironmentsModule, LIBRARY_EXCHANGES } from '@bookstore-nx/microservices';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DomainsModule } from '../domains/domains.module';

@Module({
  imports: [
    EnvironmentsModule,
    AmqpModule.forRoot(LIBRARY_EXCHANGES),
    DomainsModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('LIBRARY_MONGO_HOST');
        const port = configService.get<number>('LIBRARY_MONGO_PORT');
        const username = configService.get<string>('LIBRARY_MONGO_USERNAME');
        const password = configService.get<string>('LIBRARY_MONGO_PASSWORD');
        const dbName = configService.get<string>('LIBRARY_MONGO_DB');
        return {
          uri: `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`,
        };
      },
    }),
  ],
})
export class AppModule {}
