export * as User from './user';

import { SQL } from './sql';

export function getByEmail(email: string) {
  return SQL.DB.selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
}
