import { use, StackContext, NextjsSite, Config } from 'sst/constructs';
import { Database } from './Database';

export function Web({ stack }: StackContext) {
  const LOGROCKET_APP_ID = new Config.Secret(stack, 'LOGROCKET_APP_ID');

  const web = new NextjsSite(stack, 'web', {
    customDomain: stack.stage === 'prod' ? 'stephenstpierre.com' : undefined,
    path: 'packages/web',
    warm: stack.stage === 'prod' ? 40 : undefined,
    timeout: stack.stage === 'prod' ? '20 seconds' : '10 seconds',
    openNextVersion: '2.3.7',
    environment: {
      NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
    },
    bind: [use(Database), LOGROCKET_APP_ID],
  });

  stack.addOutputs({
    webUrl: web.customDomainUrl || web.url,
  });
}
