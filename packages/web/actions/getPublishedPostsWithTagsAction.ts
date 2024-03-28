'use server';

import { Post } from '@core/post';

async function getPosts(tag?: string) {
  let posts = [];
  let query = Post.getPublishedPostsWithTags;

  if (tag) {
    query = () => Post.getPublishedPostsByTagWithRelations(tag);
  }

  try {
    posts = await query();
  } catch (err) {
    posts = await query();
  }

  return posts;
}

export default getPosts;
