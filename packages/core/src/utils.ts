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
