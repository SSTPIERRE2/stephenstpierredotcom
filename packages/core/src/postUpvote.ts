export * as PostUpvote from './postUpvote';

import { sql } from 'kysely';
import { ulid } from 'ulid';
import { SQL } from './sql';

export async function create(post_id: string, visitor_id: string) {
  const result = await SQL.DB.insertInto('post_upvote')
    .values({
      id: ulid(),
      post_id,
      visitor_id,
    })
    .returning('votes')
    .executeTakeFirst();

  if (!result?.votes) {
    throw new Error('Post upvote not found.');
  }

  return { votes: result.votes };
}

export async function update(post_id: string, visitor_id: string) {
  const result = await SQL.DB.updateTable('post_upvote')
    .set((eb) => ({
      votes: eb('votes', '+', 1),
    }))
    .where('post_id', '=', post_id)
    .where('visitor_id', '=', visitor_id)
    .returning('votes')
    .executeTakeFirst();

  if (!result?.votes) {
    throw new Error('Post upvote not found.');
  }

  return result;
}

export async function getTotalPostUpvotes(post_id: string) {
  const totalUpvotes = await SQL.DB.selectFrom('post_upvote')
    .select('votes')
    .where('post_upvote.post_id', '=', post_id)
    .execute();

  return {
    votes: totalUpvotes.reduce((acc, curr) => acc + curr.votes, 0),
  };
}

export function getRecentUpvotesByVisitorId(
  post_id: string,
  visitor_id: string,
) {
  return SQL.DB.selectFrom('post_upvote')
    .select(['id', 'votes'])
    .where('post_upvote.post_id', '=', post_id)
    .where('post_upvote.visitor_id', '=', visitor_id)
    .where(
      'post_upvote.created',
      '>',
      // @ts-expect-error The docs don't give an example of how to make TS accept raw sql and I can't find anything on the internet about it
      sql`CURRENT_TIMESTAMP - INTERVAL '1 day'`,
    )
    .executeTakeFirst();
}

export async function updateById(id: string) {
  const result = await SQL.DB.updateTable('post_upvote')
    .set((eb) => ({
      votes: eb('votes', '+', 1),
    }))
    .where('id', '=', id)
    .returning(['id', 'votes'])
    .executeTakeFirst();

  if (!result) {
    throw new Error('Post upvote not found.');
  }

  return result;
}

export function createOrUpdate(
  post_id: string,
  visitor_id: string,
  upvote_id: string | undefined,
) {
  if (upvote_id) {
    return updateById(upvote_id);
  }

  return create(post_id, visitor_id);
}
