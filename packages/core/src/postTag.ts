export * as PostTag from './postTag';

import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(post_id: string, tag_id: string) {
  const result = SQL.DB.insertInto('post_tag')
    .values({ id: ulid(), post_id, tag_id })
    .returningAll()
    .execute();

  return result;
}

export async function deleteById(id: string) {
  const result = await SQL.DB.deleteFrom('post_tag')
    .where('id', '=', id)
    .returning('id')
    .execute();

  return result;
}

export async function getAllByPostId(post_id: string) {
  console.log(`getting postTags`, post_id);

  const result = await SQL.DB.selectFrom('post_tag')
    .selectAll()
    .where('post_id', '=', post_id)
    .execute();

  return result;
}

export async function getByIds(post_id: string, tag_id: string) {
  const result = await SQL.DB.selectFrom('post_tag')
    .selectAll()
    .where('post_id', '=', post_id)
    .where('tag_id', '=', tag_id)
    .executeTakeFirst();

  return result;
}
