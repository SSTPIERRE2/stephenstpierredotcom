export * as Post from './post';

import { SQL } from './sql';

export enum PostType {
  Post = 1,
  Tip,
}

interface Post {
  id: string;
  type: PostType;
}

export async function createAll(posts: Post[]) {
  const values = posts.map(({ id, type }) => ({
    id,
    type,
  }));

  const [result] = await SQL.DB.insertInto('post')
    .values(values)
    .returningAll()
    .execute();

  return result;
}

export async function get(post_id: string) {
  const [result] = await SQL.DB.selectFrom('post')
    .select(['type', 'views', 'created', 'updated'])
    .where('id', '=', post_id)
    .execute();

  return result;
}
