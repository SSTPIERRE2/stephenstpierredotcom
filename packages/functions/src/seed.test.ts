import { Post } from '@core/post-dynamo';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { onCreate, onUpdate } from './seed';
import { Tag } from '@core/tag-dynamo';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;
const TagTable = Table.Tag.tableName;

describe.sequential('onCreate stack, followed by onUpdate', () => {
  beforeAll(async () => {
    await Post.deleteAll(PostTable);
    await Tag.deleteAll(TagTable);
  });

  afterAll(async () => {
    await Post.deleteAll(PostTable);
    await Tag.deleteAll(TagTable);
  });

  it('Seeds with all posts and post tags', async () => {
    await onCreate();

    const post = await Post.getBySlug(PostTable, 'test-post');
    expect(post).toBeDefined();

    const tag = await Tag.getByName(TagTable, 'javascript');
    expect(tag).toBeDefined();
  });

  it('Updates posts with new content/abstract/published status, creates new tags and post tags as needed, deletes old post tags, and deletes any renamed posts and relations', async () => {
    const oldDbRenamedPost = await Post.getBySlug(
      PostTable,
      'post-to-be-renamed',
    );
    expect(oldDbRenamedPost).toBeDefined();

    await onUpdate();

    const post = await Post.getBySlug(PostTable, 'test-post');
    expect(post).toBeDefined();

    const isContentUpdated = post?.content.includes(
      'Here is some new content I added.',
    );
    expect(isContentUpdated).toBe(true);

    const isAbstractUpdated = post?.abstract.includes('Abstract updated.');
    expect(isAbstractUpdated).toBe(true);

    const isPublishedUpdated = post?.isPublished === 1;
    expect(isPublishedUpdated).toBe(true);

    const isPublishedDateUpdated =
      post?.publishedOn === new Date('2024-01-29').toISOString();
    expect(isPublishedDateUpdated).toBe(true);

    expect(post?.tags).toHaveLength(2);

    const jsTag = await Tag.getByName(TagTable, 'javascript');
    expect(jsTag).toBeDefined();
    const expectedTags = await Tag.getAllByNames(TagTable, ['react', 'nextjs']);
    expect(expectedTags).toHaveLength(2);

    const oldRenamedPost = await Post.getBySlug(
      PostTable,
      'post-to-be-renamed',
    );
    expect(oldRenamedPost).not.toBeDefined();

    const renamedPost = await Post.getBySlug(PostTable, 'post-renamed');

    expect(renamedPost).toBeDefined();
    expect(renamedPost?.tags).toHaveLength(1);
  });
});
