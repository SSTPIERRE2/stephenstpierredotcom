export * as AnalyticsEvent from './analyticsEvent';

import { ulid } from 'ulid';
import { SQL } from './sql';
import { RawBuilder, sql } from 'kysely';

function json<T>(obj: T): RawBuilder<T> {
  return sql`${obj}::jsonb`;
}

export async function create(
  name: string,
  visitor_id: string,
  url: string,
  browser_name: string,
  browser_version: string,
  browser_engine: string,
  device_model: string,
  device_type: string,
  device_vendor: string,
  os_name: string,
  os_version: string,
  metadata: string
) {
  const [result] = await SQL.DB.insertInto('analytics_event')
    .values({
      id: ulid(),
      visitor_id,
      name,
      url,
      browser_name,
      browser_version,
      browser_engine,
      device_model,
      device_type,
      device_vendor,
      os_name,
      os_version,
      metadata: json(metadata),
    })
    .returningAll()
    .execute();

  return result;
}

export function getByEventName(name: string) {
  return SQL.DB.selectFrom('analytics_event')
    .selectAll()
    .where('name', '=', name)
    .orderBy('created', 'desc')
    .execute();
}

export function list(fields?: FieldQuery[]) {
  let query = SQL.DB.selectFrom('analytics_event').selectAll();

  fields?.forEach((field) => {
    console.log(`inside list function`, field);
    query = query.where(field.name, field.matcher || '=', field.value);
  });

  return query.orderBy('created', 'desc').execute();
}

export function countEvents() {
  return SQL.DB.selectFrom('analytics_event')
    .select(['name', (eb) => eb.fn.count('name').as('total')])
    .groupBy('name')
    .execute();
}
