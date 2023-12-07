export * as Category from './category';

import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(name: string) {
  const [result] = await SQL.DB.insertInto('categories')
    .values({ id: ulid(), name })
    .returningAll()
    .execute();

  return result;
}

export async function createAll(names: string[]) {
  console.log(`createAll categories`, names);

  const values = names.map((name) => ({
    id: ulid(),
    name,
  }));

  const [result] = await SQL.DB.insertInto('categories')
    .values(values)
    .returningAll()
    .execute();

  return result;
}

export function list() {
  return SQL.DB.selectFrom('categories')
    .selectAll()
    .orderBy('created', 'desc')
    .execute();
}
