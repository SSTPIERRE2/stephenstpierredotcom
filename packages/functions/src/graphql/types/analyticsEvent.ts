import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { AnalyticsEvent } from '@graphql-rds/core/analyticsEvent';
import fetch from 'node-fetch';
import DeviceDetector from 'device-detector-js';

const deviceDetector = new DeviceDetector();

interface IpData {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export const EventName = builder.enumType('EventName', {
  values: [
    'pageView',
    'click',
    'cursorThrash',
    'error',
    'navigation',
    'hover',
    'rageClick',
    'form',
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
      metadata: t.field({
        type: 'JSON',
        resolve: (parent) => {
          return JSON.parse(parent.metadata as string);
        },
      }),
      created: t.field({ type: 'Date', resolve: (parent) => parent.created }),
    }),
  });

const AnalyticsCount = builder
  .objectRef<{ name: string; total: number }>('AnalyticsCount')
  .implement({
    fields: (t) => ({
      name: t.exposeString('name'),
      total: t.exposeInt('total'),
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
  countEvents: t.field({
    type: [AnalyticsCount],
    resolve: async () => {
      const counted = await AnalyticsEvent.countEvents();
      console.log('counted events', counted);
      const numerical = counted.map((e) => ({
        ...e,
        total: Number(e.total),
      }));

      return numerical;
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
    },
    resolve: async (root, args, context) => {
      const headers = context.event.headers;
      const userAgent = deviceDetector.parse(headers['user-agent'] || '');
      const { client, os, device } = userAgent;
      const metadata: Record<string, unknown> = args.metadata
        ? JSON.parse(args.metadata)
        : {};

      console.log('Got the user agent', userAgent);
      console.log(`given metadata`, args.metadata);

      if (args.name === 'pageView') {
        const ipRequest = await fetch(
          `https://ipapi.co/${headers['x-forwarded-for']}/json/`
        );
        const ipData = (await ipRequest.json()) as IpData;
        console.log('got user location', ipData);
        const selectedData = [
          'ip',
          'city',
          'region',
          'region_code',
          'country_name',
          'country_code_iso3',
          'latitude',
          'longitude',
          'org',
        ] as const;

        selectedData.forEach((data) => {
          if (data in ipData) {
            metadata[data] = ipData[data];
          }
        });
      }

      console.log(`creating with final metadata`, metadata);

      return AnalyticsEvent.create(
        args.name,
        args.visitorId,
        headers.origin || '',
        client?.name || '',
        client?.version || '',
        // @ts-ignore it doesn't matter if engine exists, this is safe
        client?.engine || '',
        device?.model || '',
        device?.type || '',
        device?.brand || '',
        os?.name || '',
        os?.version || '',
        JSON.stringify(metadata)
      );
    },
  }),
}));
