export * as Message from './message';

import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(text: string, email: string) {
  const [result] = await SQL.DB.insertInto('message')
    .values({ id: ulid(), text, email })
    .returningAll()
    .execute();

  return result;
}

export function getAllByEmail(email: string) {
  return SQL.DB.selectFrom('message')
    .selectAll()
    .where('email', '=', email)
    .execute();
}

export function list() {
  return SQL.DB.selectFrom('message')
    .selectAll()
    .orderBy('created', 'desc')
    .execute();
}
