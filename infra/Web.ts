// import { use, StackContext, NextjsSite, Config } from 'sst/constructs';
import { PostTable, TagTable } from './Database';

// export function Web({ stack }: StackContext) {
const LOGROCKET_APP_ID = new sst.Secret('LOGROCKET_APP_ID');
// const { PostTable, TagTable } = use(Database);

export const web = new sst.aws.Nextjs('web', {
  domain: $app.stage === 'prod' ? 'stephenstpierre.com' : undefined,
  path: 'packages/web',
  warm: $app.stage === 'prod' ? 20 : undefined,
  openNextVersion: '2.3.7',
  environment: {
    NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
  },
  link: [PostTable, TagTable, LOGROCKET_APP_ID],
});

// stack.addOutputs({
//   webUrl: web.customDomainUrl || web.url,
// });
// }
