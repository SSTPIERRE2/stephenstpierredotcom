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

  it('Updates posts with new content/abstract/published status, creates new tags and post tags as needed, deletes old post tags, and deletes any renamed posts and relations', async () => {
    const oldDbRenamedPost = await Post.getBySlug('post-to-be-renamed');
    expect(oldDbRenamedPost).toBeDefined();

    await onUpdate();

    const post = await Post.getBySlug('test-post');
    // console.log(`checking an updated post`, post);

    const isContentUpdated = post.content.includes(
      'Here is some new content I added.'
    );
    expect(isContentUpdated).toBe(true);

    const isAbstractUpdated = post.abstract.includes('Abstract updated.');
    expect(isAbstractUpdated).toBe(true);

    const isPublishedUpdated = post.is_published === true;
    expect(isPublishedUpdated).toBe(true);

    console.log(
      'pls',
      post.published_on,
      post.published_on === new Date('2024-01-29').toISOString()
    );

    const isPublishedDateUpdated =
      post.published_on === new Date('2024-01-29').toISOString();
    expect(isPublishedDateUpdated).toBe(true);

    const jsTag = await Tag.getByName('javascript');
    expect(jsTag).toBeDefined();
    const expectedTags = await Tag.getAllByNames(['react', 'nextjs']);
    expect(expectedTags).toHaveLength(2);

    const postTags = await PostTag.getAllByPostId(post.id);
    expect(postTags).toHaveLength(2);

    await expect(Post.getBySlug('post-to-be-renamed')).rejects.toThrow();

    const oldRenamedPostTags = await PostTag.getAllByPostId(
      oldDbRenamedPost.id
    );
    expect(oldRenamedPostTags).toHaveLength(0);

    const renamedPost = await Post.getBySlug('post-renamed');
    expect(renamedPost).toBeDefined();

    const renamedPostTags = await PostTag.getAllByPostId(renamedPost.id);
    expect(renamedPostTags).toHaveLength(1);
  });
});
