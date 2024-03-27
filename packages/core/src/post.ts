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
  published_on: string | null;
  created: Date;
  updated: Date | null;
}

export type PostWithTags = Pick<
  Post,
  'id' | 'title' | 'slug' | 'abstract' | 'content' | 'published_on' | 'updated'
> & { tags: string[] };

export type PublishedPostWithTags = PostWithTags & { published_on: string };

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

export async function updateAll(posts: Post[]) {
  const queries = posts.map(
    async ({ id, content, abstract, is_published, published_on }) => {
      const result = await SQL.DB.updateTable('post')
        .set({
          content,
          abstract,
          is_published,
          published_on,
        })
        .where('id', '=', id)
        .executeTakeFirstOrThrow();

      return result;
    },
  );

  const result = await Promise.all(queries);
  return result;
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

export async function deleteById(id: string) {
  const result = await SQL.DB.deleteFrom('post')
    .where('id', '=', id)
    .returning('id')
    .execute();

  return result;
}

// @todo re-enable getting published posts only when we have enough published ones
export async function getPublishedPostsWithTags() {
  const map: Record<string, PublishedPostWithTags> = {};
  const result = await SQL.DB.selectFrom('post')
    .innerJoin('post_tag', 'post_tag.post_id', 'post.id')
    .innerJoin('tag', 'post_tag.tag_id', 'tag.id')
    .where('is_published', 'is not', null)
    .select([
      'post.id',
      'post.title',
      'post.slug',
      'post.abstract',
      'post.content',
      'post.published_on',
      'post.updated',
      'tag.name as tagName',
    ])
    .orderBy('published_on', 'desc')
    .execute();

  // Since joining will give us multiple records for each post-tag relation, we need to reduce the results
  for (const post of result) {
    if (!map[post.id]) {
      const { tagName, ...rest } = post;
      map[post.id] = {
        ...rest,
        tags: [tagName],
      } as PublishedPostWithTags;
    } else {
      map[post.id].tags.push(post.tagName);
    }
  }

  return Object.values(map);
}

export async function getPublishedPostsByTagWithRelations(tag: string) {
  const postsWithTags = await getPublishedPostsWithTags();

  // Since we actually want all tag relations, we can't just use .where('tag.name', '=', tag) in the query
  const result = postsWithTags.reduce((acc: PublishedPostWithTags[], curr) => {
    if (curr.tags.includes(tag)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return result;
}
