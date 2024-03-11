import { use, StackContext, NextjsSite, Config } from 'sst/constructs';
import { Database } from './Database';

export function Web({ stack }: StackContext) {
  const LOGROCKET_APP_ID = new Config.Secret(stack, 'LOGROCKET_APP_ID');

  const web = new NextjsSite(stack, 'web', {
    path: 'packages/web',
    environment: {
      NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
    },
    bind: [use(Database), LOGROCKET_APP_ID],
  });

  stack.addOutputs({
    webUrl: web.url,
  });
}
