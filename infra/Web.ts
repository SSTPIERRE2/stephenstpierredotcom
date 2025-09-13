import path from 'path';
import { PostTable, TagTable } from './Database';

const LOGROCKET_APP_ID = new sst.Secret('LOGROCKET_APP_ID');

export const Web = new sst.aws.Nextjs('Web', {
  domain: $app.stage === 'prod' ? 'stephenstpierre.com' : undefined,
  path: path.resolve('packages/web'),
  warm: $app.stage === 'prod' ? 20 : undefined,
  link: [PostTable, TagTable, LOGROCKET_APP_ID],
});
