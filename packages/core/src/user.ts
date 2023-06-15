export * as User from './user';

import { SQL } from './sql';

export function getByUsername(username: string) {
  return SQL.DB.selectFrom('users')
    .selectAll()
    .where('user_name', '=', username)
    .executeTakeFirst();
}
