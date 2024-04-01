import { Table, Script, StackContext } from 'sst/constructs';

export function Database({ stack }: StackContext) {
  const PostTable = new Table(stack, 'Post', {
    fields: {
      id: 'string',
      title: 'string',
      slug: 'string',
      abstract: 'string',
      content: 'string',
      isPublished: 'number',
      publishedOn: 'string',
      created: 'string',
      updated: 'string',
      views: 'number',
      likes: 'number',
      tags: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
    globalIndexes: {
      SlugIndex: { partitionKey: 'slug' },
      IsPublishedIndex: { partitionKey: 'isPublished' },
    },
  });
  const TagTable = new Table(stack, 'Tag', {
    fields: {
      name: 'string',
      created: 'string',
    },
    primaryIndex: { partitionKey: 'name' },
  });

  new Script(stack, 'seed-db', {
    defaults: {
      function: {
        bind: [PostTable, TagTable],
        copyFiles: [{ from: 'packages/functions/content', to: './content' }],
      },
    },
    onCreate: 'packages/functions/src/seed.onCreate',
    onUpdate: 'packages/functions/src/seed.onUpdate',
  });

  return { PostTable, TagTable };
}
