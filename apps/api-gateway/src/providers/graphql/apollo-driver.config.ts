import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'node:path';
import * as process from 'node:process';

export const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: path.join(process.cwd(), 'apps', 'api-gateway', 'src', 'providers', 'graphql', 'graphql.schema.gql'),
  sortSchema: true,
  context: ({ req, res }) => ({ req, res }),
};
