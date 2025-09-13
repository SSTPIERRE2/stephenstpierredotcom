/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target(event) {
        if (event.type === 'branch' && event.action === 'pushed') {
          if (event.branch === 'main') {
            return {
              stage: 'development',
            };
          }
          if (['staging', 'production'].includes(event.branch)) {
            return {
              stage: event.branch,
            };
          }
        }

        if (
          event.type === 'pull_request' &&
          ['staging', 'main', 'production'].includes(event.base)
        ) {
          return {
            stage: `pr-${event.number}-${event.head}`,
          };
        }
      },
    },
  },
  app(input) {
    return {
      name: 'stephenstpierredotcom',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const { PostTable, TagTable } = await import('./infra/Database');
    await import('./infra/Web');

    new sst.aws.Cron('SeedJob', {
      schedule: 'cron(0 0 31 2 ? *)',
      function: {
        handler: 'packages/functions/src/seed.onCreate',
        link: [PostTable, TagTable],
      },
    });
  },
});
