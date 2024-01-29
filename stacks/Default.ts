import { use, Script, StackContext } from 'sst/constructs';
import { Database } from './Database';

export function Default({ stack }: StackContext) {
  new Script(stack, 'seed-rds', {
    defaults: {
      function: {
        bind: [use(Database)],
        copyFiles: [{ from: 'packages/functions/content', to: './content' }],
      },
    },
    onCreate: 'packages/functions/src/seed.onCreate',
    onUpdate: 'packages/functions/src/seed.onUpdate',
  });
}
