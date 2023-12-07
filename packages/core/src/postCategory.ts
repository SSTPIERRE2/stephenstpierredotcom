export * as PostCategory from './postCategory';

import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(post_id: string, category_id: string) {
  const [result] = await SQL.DB.insertInto('post_categories')
    .values({ id: ulid(), post_id, category_id })
    .returningAll()
    .execute();

  return result;
}
