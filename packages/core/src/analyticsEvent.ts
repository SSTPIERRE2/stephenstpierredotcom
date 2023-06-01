export * as AnalyticsEvent from './analyticsEvent';

import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(
  name: string,
  url: string,
  browser_name: string,
  browser_version: string,
  browser_engine: string,
  device_model: string,
  device_type: string,
  device_vendor: string,
  os_name: string,
  os_version: string,
  cpu_architecture: string,
  metadata: string,
  email?: string | null
) {
  const [result] = await SQL.DB.insertInto('analytics_event')
    .values({
      id: ulid(),
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
      cpu_architecture,
      email,
      metadata,
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

export function list() {
  return SQL.DB.selectFrom('analytics_event')
    .selectAll()
    .orderBy('created', 'desc')
    .execute();
}
