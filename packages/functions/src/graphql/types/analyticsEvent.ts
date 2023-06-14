import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { AnalyticsEvent } from '@graphql-rds/core/analyticsEvent';
import DeviceDetector from 'device-detector-js';

const deviceDetector = new DeviceDetector();

export const EventName = builder.enumType('EventName', {
  values: [
    'pageView',
    'click',
    'cursorThrash',
    'error',
    'navigation',
    'hover',
    'rageClick',
  ] as const,
});

const AnalyticsEventType = builder
  .objectRef<SQL.Row['analytics_event']>('AnalyticsEvent')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      visitorId: t.exposeString('visitor_id'),
      name: t.field({
        type: EventName,
        resolve: (parent) => parent.name as AnalyticsEventName,
      }),
      url: t.exposeString('url'),
      browserName: t.exposeString('browser_name'),
      browserVersion: t.exposeString('browser_version'),
      browserEngine: t.exposeString('browser_engine'),
      deviceModel: t.exposeString('device_model'),
      deviceType: t.exposeString('device_type'),
      deviceVendor: t.exposeString('device_vendor'),
      osName: t.exposeString('os_name'),
      osVersion: t.exposeString('os_version'),
      email: t.exposeString('email', {
        nullable: true,
      }),
      metadata: t.field({
        type: 'JSON',
        resolve: (parent) => {
          return JSON.parse(parent.metadata as string);
        },
      }),
      created: t.field({ type: 'Date', resolve: (parent) => parent.created }),
    }),
  });

builder.queryFields((t) => ({
  analyticsEvents: t.field({
    type: [AnalyticsEventType],
    args: {
      fields: t.arg.string(),
    },
    resolve: (_, args) => {
      let fields = [];
      console.log(`querying events`, args.fields);

      if (args.fields) {
        fields = JSON.parse(args.fields);
      }
      return AnalyticsEvent.list(fields);
    },
  }),
}));

builder.mutationFields((t) => ({
  createAnalyticsEvent: t.field({
    type: AnalyticsEventType,
    args: {
      name: t.arg({ type: EventName, required: true }),
      visitorId: t.arg.string({ required: true }),
      metadata: t.arg.string(),
      email: t.arg.string(),
    },
    resolve: (_, args, context) => {
      const headers = context.event.headers;
      const userAgent = deviceDetector.parse(headers['user-agent'] || '');
      const { client, os, device } = userAgent;
      console.log('Got the user agent', userAgent);
      console.log(`got metadata`, args.metadata);

      return AnalyticsEvent.create(
        args.name,
        args.visitorId,
        headers.origin || '',
        client?.name || '',
        client?.version || '',
        // @ts-ignore it doesn't matter if engine exists, this is completely safe
        client?.engine || '',
        device?.model || '',
        device?.type || '',
        device?.brand || '',
        os?.name || '',
        os?.version || '',
        args.metadata || '{}',
        args.email
      );
    },
  }),
}));
