import { Post } from '@graphql-rds/core/post';
import { beforeAll, expect, it, describe } from 'vitest';
import { onCreate, onUpdate } from './seed';
import { Tag } from '@graphql-rds/core/tag';
import { PostTag } from '@graphql-rds/core/postTag';
import { dbUtils } from '@graphql-rds/core/utils';

describe.sequential('onCreate stack, followed by onUpdate', () => {
  beforeAll(async () => {
    await dbUtils.deleteTableRecords(['post', 'tag', 'post_tag']);
  });

  it('Seeds with all posts and post tags', async () => {
    await onCreate();

    const post = await Post.getBySlug('test-post');
    expect(post).toBeDefined();

    const tag = await Tag.getByName('javascript');
    expect(tag).toBeDefined();

    const postTag = await PostTag.getAllByPostId(post.id);
    expect(postTag).toHaveLength(1);
  });

  it('updates posts with different content, creates new tags and post tags as needed, and deletes old post tags', async () => {
    await onUpdate();

    const post = await Post.getBySlug('test-post');
    const isContentUpdated = post.content.includes(
      'Here is some new content I added.'
    );
    expect(isContentUpdated).toBe(true);

    const jsTag = await Tag.getByName('javascript');
    expect(jsTag).toBeDefined();
    const expectedTags = await Tag.getAllByNames(['react', 'nextjs']);
    expect(expectedTags).toHaveLength(2);

    const postTags = await PostTag.getAllByPostId(post.id);
    expect(postTags).toHaveLength(2);
  });
});
