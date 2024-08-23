import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { apolloDriverConfig } from './graphql/apollo-driver.config';
import { ClientsModule } from '@nestjs/microservices';
import { IDENTITY_MICROSERVICE_CONFIG } from '@bookstore-nx/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
    ClientsModule.registerAsync([IDENTITY_MICROSERVICE_CONFIG]),
  ],
})
export class ProvidersModule {}
