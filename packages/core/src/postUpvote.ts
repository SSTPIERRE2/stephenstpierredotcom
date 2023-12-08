export * as PostUpvote from './postUpvote';
import { sql } from 'kysely'

import { SQL } from './sql';

export async function getRecentUpvotesByVisitorId(post_id: string, visitor_id: string) {
  const [result] = await SQL.DB.selectFrom('post_upvote')
    .select('votes')
    .innerJoin('post', 'post.id', 'post_upvote.post_id')
    .where('post.id', '=', post_id)
    .where('post_upvote.visitor_id', '=', visitor_id)
    .where('post_upvote.created', '>', sql`CURRENT_TIMESTAMP - INTERVAL '1 day'`)
    .execute();

  return result;
}