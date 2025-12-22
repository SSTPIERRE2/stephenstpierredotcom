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
      runtime: 'nodejs22.x',
    };
  },
  async run() {
    const { PostTable, TagTable } = await import('./infra/Database');
    await import('./infra/Web');

    new sst.aws.Function('SeedDatabase', {
      handler: 'packages/functions/src/seed.onUpdate',
      link: [PostTable, TagTable],
      copyFiles: [{ from: 'packages/functions/content', to: './content' }],
    });
  },
});
