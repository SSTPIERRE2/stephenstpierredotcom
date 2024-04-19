import { Post } from '@core/post';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { onCreate, onUpdate } from './seed';
import { Tag } from '@core/tag';

describe.sequential('onCreate stack, followed by onUpdate', () => {
  beforeAll(async () => {
    await Post.deleteAll();
    await Tag.deleteAll();
  });

  afterAll(async () => {
    await Post.deleteAll();
    await Tag.deleteAll();
  });

  it('Seeds with all posts and post tags', async () => {
    await onCreate();

    const post = await Post.getBySlug('test-post');
    expect(post).toBeDefined();

    const tag = await Tag.getByName('javascript');
    expect(tag).toBeDefined();
  });

  it('Updates posts with new content/abstract/published status, creates new tags and post tags as needed, deletes old post tags, and deletes any renamed posts and relations', async () => {
    const oldDbRenamedPost = await Post.getBySlug('post-to-be-renamed');
    expect(oldDbRenamedPost).toBeDefined();

    await onUpdate();

    const post = await Post.getBySlug('test-post');
    expect(post).toBeDefined();

    const isContentUpdated = post?.content.includes(
      'Here is some new content I added.',
    );
    expect(isContentUpdated).toBe(true);

    const isAbstractUpdated = post?.abstract.includes('Abstract updated.');
    expect(isAbstractUpdated).toBe(true);

    const isPublishedDateUpdated =
      post?.publishedOn === new Date('2024-01-29').valueOf();
    expect(isPublishedDateUpdated).toBe(true);

    expect(post?.tags).toHaveLength(2);

    const jsTag = await Tag.getByName('javascript');
    expect(jsTag).toBeDefined();
    const expectedTags = await Tag.getAllByNames(['react', 'nextjs']);
    expect(expectedTags).toHaveLength(2);

    const oldRenamedPost = await Post.getBySlug('post-to-be-renamed');
    expect(oldRenamedPost).not.toBeDefined();

    const renamedPost = await Post.getBySlug('post-renamed');

    expect(renamedPost).toBeDefined();
    expect(renamedPost?.tags).toHaveLength(1);
  });

  it('queries Posts in descending order by publish date', async () => {
    const posts = await Post.queryPublished();

    expect(posts[0].slug).toBe('post-renamed');
    expect(posts[1].slug).toBe('test-post');
  });

  it('queries Posts with the Tag "javascript"', async () => {
    const posts = await Post.queryPublished('javascript');

    expect(posts[0].slug).toBe('post-renamed');
  });
});
