import * as path from 'node:path';
import * as process from 'node:process';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  // autoSchemaFile: true,
  autoSchemaFile: path.join(
    process.cwd(),
    'apps',
    'api-gateway',
    'src',
    'shared',
    'providers',
    'graphql',
    'schema.gql',
  ),
  sortSchema: true,
  context: ({ req, res }) => ({ req, res }),
  playground: true,
  path: '/graphql',
};
