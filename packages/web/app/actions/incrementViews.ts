'use server';

import { Post } from '@core/post';

export async function incrementViews(postSlug: string) {
  return await Post.increment(postSlug, 'views');
}
