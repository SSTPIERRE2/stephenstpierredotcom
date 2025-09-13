/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
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
        handler: 'packages/functions/src/seed.ts',
        link: [PostTable, TagTable],
      },
    });
  },
});
