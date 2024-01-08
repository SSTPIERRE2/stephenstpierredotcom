export * as Post from './post';

import { SQL } from './sql';

export enum PostType {
  Post = 1,
  Tip,
}

interface Post {
  id: string;
  type: PostType;
  slug: string;
}

export async function createAll(posts: Post[]) {
  const values = posts.map(({ id, type, slug }) => ({
    id,
    type,
    slug,
  }));

  const [result] = await SQL.DB.insertInto('post')
    .values(values)
    .returningAll()
    .execute();

  return result;
}

export async function getById(id: string) {
  const [result] = await SQL.DB.selectFrom('post')
    .select(['type', 'views', 'created', 'updated'])
    .where('id', '=', id)
    .execute();

  return result;
}

export async function getBySlug(slug: string) {
  const [result] = await SQL.DB.selectFrom('post')
    .select(['id', 'type', 'views', 'created', 'updated'])
    .where('slug', '=', slug)
    .execute();

  return result;
}

export async function incrementViews(postId: string) {
  console.log(`trying to increment views`, postId);

  const result = await SQL.DB.updateTable('post')
    .set((eb) => ({
      views: eb('views', '+', 1),
    }))
    .where('id', '=', postId)
    .returning('views')
    .executeTakeFirst();

  console.log(`any result?`, result);

  if (!result) {
    throw new Error('Post not found.');
  }

  return result;
}
