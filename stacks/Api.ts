import {
  use,
  StackContext,
  Api as ApiGateway,
  Config,
  Auth,
} from 'sst/constructs';
import { Database } from './Database';

export function Api({ stack }: StackContext) {
  const JWT_SECRET = new Config.Secret(stack, 'JWT_SECRET');
  const RESEND_API_KEY = new Config.Secret(stack, 'RESEND_API_KEY');

  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'packages/functions/src/auth.handler',
    },
  });

  const api = new ApiGateway(stack, 'api', {
    defaults: {
      function: {
        bind: [use(Database), JWT_SECRET, RESEND_API_KEY],
      },
    },
    routes: {
      'POST /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/graphql/graphql.handler',
        },
      },
    },
    cors: {
      allowCredentials: true,
      allowHeaders: ['content-type'],
      allowMethods: ['ANY'],
      allowOrigins: ['http://localhost:3000', 'https://INSERT_PROD_URL'],
    },
  });

  auth.attach(stack, {
    api,
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
