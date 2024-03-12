// Accessing anything bound in SST in a server action file like this is broken due to a top level await error
// For now, such server actions must be written inline in a server component
'use server';

import { PostUpvote } from '../../core/src/postUpvote';
import { revalidatePath } from 'next/cache';

export async function incrementUpvote(
  postId: string,
  visitorId: string,
  recentVote: string | undefined,
) {
  await PostUpvote.createOrUpdate(postId, visitorId, recentVote); // Accessing bound DB functions causes an error, do not use until SST fixes it

  revalidatePath('/[postSlug]', 'page');
}
