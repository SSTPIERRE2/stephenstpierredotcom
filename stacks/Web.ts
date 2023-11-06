import { use, StackContext, NextjsSite } from 'sst/constructs';
import { Api } from './Api.js';
import { Database } from './Database';

export function Web({ stack }: StackContext) {
  const api = use(Api);

  const web = new NextjsSite(stack, 'web', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
    bind: [use(Database)],
  });

  stack.addOutputs({
    webUrl: web.url,
  });
}
