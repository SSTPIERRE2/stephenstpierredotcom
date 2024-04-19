import { Table, Script, StackContext } from 'sst/constructs';

export function Database({ stack }: StackContext) {
  const PostTable = new Table(stack, 'Post', {
    // We only need to specify a field/attribute that is used as a partitionKey or sortKey, otherwise the data type is inferred
    fields: {
      slug: 'string',
      isPublished: 'number',
      publishedOn: 'number',
    },
    primaryIndex: { partitionKey: 'slug' },
    globalIndexes: {
      // Get published (or unpublished) posts, automatically sorted in descending order
      isPublishedIndex: { partitionKey: 'isPublished', sortKey: 'publishedOn' },
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
