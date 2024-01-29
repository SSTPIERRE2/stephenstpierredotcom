export * as dbUtils from './utils';

import { SQL } from './sql';

const tableNames = ['post', 'tag', 'post_tag'] as const;
export type TableName = (typeof tableNames)[number];

export async function listTableRecords(name: TableName) {
  const result = await SQL.DB.selectFrom(name).selectAll().execute();

  return result;
}

export function deleteTableRecords(input: TableName | TableName[]) {
  if (Array.isArray(input)) {
    const queries = tableNames.map(async (name) => {
      const result = await SQL.DB.deleteFrom(name).execute();

      return result;
    });

    return Promise.all(queries);
  }

  return SQL.DB.deleteFrom(input).execute();
}

/**
 * Postgres strips timezone info from dates and adds a space where the T should go
 * @param timestamp example 2024-01-29 00:00:00 instead of 2024-01-29T00:00:00.000Z
 * @returns the ISO formatted string
 */
export function convertDbTimestampToISOString(timestamp: string) {
  const result = timestamp.replace(' ', 'T');
  return result + 'Z';
}
