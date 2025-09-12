// import { Table, Script, StackContext } from 'sst/constructs';

export const PostTable = new sst.aws.Dynamo('Post', {
  // We only need to specify a field/attribute that is used as a partitionKey or sortKey, otherwise the data type is inferred
  fields: {
    slug: 'string',
    isPublished: 'number',
    publishedOn: 'number',
  },
  primaryIndex: { hashKey: 'slug' },
  globalIndexes: {
    // Get published (or unpublished) posts, automatically sorted in descending order
    isPublishedIndex: { hashKey: 'isPublished', rangeKey: 'publishedOn' },
  },
});

export const TagTable = new sst.aws.Dynamo('Tag', {
  fields: {
    name: 'string',
  },
  primaryIndex: { hashKey: 'name' },
});

// MIGRATE TO A JOB
// new Script(stack, 'seed-db', {
//   defaults: {
//     function: {
//       bind: [PostTable, TagTable],
//       copyFiles: [{ from: 'packages/functions/content', to: './content' }],
//     },
//   },
//   onCreate: 'packages/functions/src/seed.onCreate',
//   onUpdate: 'packages/functions/src/seed.onUpdate',
// });
