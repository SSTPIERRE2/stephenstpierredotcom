import { use, StackContext, NextjsSite, Config } from 'sst/constructs';
import { Api } from './Api.js';
import { Database } from './Database';

export function Web({ stack }: StackContext) {
  const api = use(Api);
  const API_URL = new Config.Secret(stack, 'API_URL');
  const LOGROCKET_APP_ID = new Config.Secret(stack, 'LOGROCKET_APP_ID');

  const web = new NextjsSite(stack, 'web', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
      NEXT_SHARP_PATH: 'node_modules/sharp',
    },
    bind: [use(Database), API_URL, LOGROCKET_APP_ID],
  });

  stack.addOutputs({
    webUrl: web.url,
  });
}
