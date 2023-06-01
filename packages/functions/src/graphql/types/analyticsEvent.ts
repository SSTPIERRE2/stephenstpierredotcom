import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { AnalyticsEvent } from '@graphql-rds/core/analyticsEvent';

const AnalyticsEventType = builder
  .objectRef<SQL.Row['analytics_event']>('AnalyticsEvent')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      url: t.exposeString('url'),
      browserName: t.exposeString('browser_name'),
      browserVersion: t.exposeString('browser_version'),
      browserEngine: t.exposeString('browser_engine'),
      deviceModel: t.exposeString('device_model'),
      deviceType: t.exposeString('device_type'),
      deviceVendor: t.exposeString('device_vendor'),
      osName: t.exposeString('os_name'),
      cpuArchitecture: t.exposeString('cpu_architecture'),
      email: t.exposeString('email', {
        nullable: true,
      }),
      metadata: t.field({ type: 'JSON', resolve: () => {} }),
      created: t.field({ type: 'Date', resolve: () => new Date() }),
    }),
  });

builder.queryFields((t) => ({
  analyticsEvents: t.field({
    type: [AnalyticsEventType],
    resolve: () => AnalyticsEvent.list(),
  }),
}));

builder.mutationFields((t) => ({
  createAnalyticsEvent: t.field({
    type: AnalyticsEventType,
    args: {
      name: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
      browser_name: t.arg.string({ required: true }),
      browser_version: t.arg.string({ required: true }),
      browser_engine: t.arg.string({ required: true }),
      device_model: t.arg.string({ required: true }),
      device_type: t.arg.string({ required: true }),
      device_vendor: t.arg.string({ required: true }),
      os_name: t.arg.string({ required: true }),
      os_version: t.arg.string({ required: true }),
      cpu_architecture: t.arg.string({ required: true }),
      metadata: t.arg.string({ required: true }),
      userID: t.arg.string(),
    },
    resolve: (_, args) =>
      AnalyticsEvent.create(
        args.name,
        args.url,
        args.browser_name,
        args.browser_version,
        args.browser_engine,
        args.device_model,
        args.device_type,
        args.device_vendor,
        args.os_name,
        args.os_version,
        args.cpu_architecture,
        args.metadata,
        args.userID
      ),
  }),
}));
