import { use, StackContext, Api as ApiGateway, Config } from 'sst/constructs';
import { Database } from './Database';

export function Api({ stack }: StackContext) {
  const JWT_SECRET = new Config.Secret(stack, 'JWT_SECRET');
  const api = new ApiGateway(stack, 'api', {
    defaults: {
      function: {
        bind: [use(Database), JWT_SECRET],
      },
    },
    routes: {
      'POST /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/graphql/graphql.handler',
        },
        pothos: {
          schema: 'packages/functions/src/graphql/schema.ts',
          output: 'packages/graphql/schema.graphql',
          commands: [
            'cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm',
          ],
        },
      },
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
