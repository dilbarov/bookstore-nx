import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { apolloDriverConfig } from './graphql/apollo-driver.config';

@Global()
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig)],
})
export class ProvidersModule {}
