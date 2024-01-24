export * as Post from './post';

import { ulid } from 'ulid';
import { SQL } from './sql';

export interface Post {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  content: string;
  views: number;
  is_published: boolean | null;
  published_on: Date | null;
  created: Date;
  updated: Date | null;
}

export type PostToCreate = Pick<
  Post,
  'title' | 'slug' | 'abstract' | 'content' | 'is_published' | 'published_on'
>;

export async function create(post: PostToCreate) {
  const result = await SQL.DB.insertInto('post')
    .values({
      id: ulid(),
      ...post,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
}

export async function createAll(posts: PostToCreate[]) {
  const values = posts.map((post) => ({
    id: ulid(),
    ...post,
  }));

  const result = await SQL.DB.insertInto('post')
    .values(values)
    .returningAll()
    .execute();

  return result;
}

export function updateAll(posts: Post[]) {
  const queries = posts.map(async ({ id, content }) => {
    const result = await SQL.DB.updateTable('post')
      .set({
        content,
      })
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return result;
  });

  return Promise.all(queries);
}

export async function getById(id: string) {
  const result = await SQL.DB.selectFrom('post')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

  return result;
}

export async function getBySlug(slug: string) {
  const result = await SQL.DB.selectFrom('post')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirstOrThrow();

  return result;
}

export async function getAllBySlugs(slugs: string[]) {
  const result = await SQL.DB.selectFrom('post')
    .selectAll()
    .where('slug', 'in', slugs)
    .execute();

  return result;
}

export async function incrementViews(postId: string) {
  const result = await SQL.DB.updateTable('post')
    .set((eb) => ({
      views: eb('views', '+', 1),
    }))
    .where('id', '=', postId)
    .returning('views')
    .executeTakeFirstOrThrow();

  return result;
}
