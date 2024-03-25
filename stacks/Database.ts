import { RDS, StackContext } from 'sst/constructs';

export function Database({ stack }: StackContext) {
  const rds = new RDS(stack, 'db', {
    engine: 'postgresql11.13',
    defaultDatabaseName: 'main',
    migrations: 'packages/core/migrations',
    types: 'packages/core/src/sql.generated.ts',
    scaling: {
      autoPause: stack.stage === 'prod' ? 60 : true,
    },
  });

  return rds;
}
