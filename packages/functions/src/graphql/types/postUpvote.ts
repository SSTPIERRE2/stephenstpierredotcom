// import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { PostUpvote } from '@graphql-rds/core/postUpvote';

// const PostUpvoteType = builder
//   .objectRef<SQL.Row['post_upvote']>('PostUpvote')
//   .implement({
//     fields: (t) => ({
//       id: t.exposeID('id'),
//       postId: t.exposeString('post_id'),
//       visitorId: t.exposeString('visitor_id'),
//       votes: t.exposeInt('votes'),
//     }),
//   });

const VotesType = builder.objectRef<{ votes: number }>('PostUpvote').implement({
  fields: (t) => ({
    votes: t.exposeInt('votes'),
  }),
});

builder.queryFields((t) => ({
  totalPostUpvotes: t.field({
    type: VotesType,
    args: {
      postId: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      const { postId } = args;
      return PostUpvote.getTotalPostUpvotes(postId);
    },
  }),
  recentUpvotesByVisitorId: t.field({
    type: VotesType,
    args: {
      postId: t.arg.string({ required: true }),
      visitorId: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const { postId, visitorId } = args;
      const recentUpvotes = await PostUpvote.getRecentUpvotesByVisitorId(
        postId,
        visitorId
      );

      return recentUpvotes || { votes: 0 };
    },
  }),
}));

builder.mutationFields((t) => ({
  createOrUpdateUpvote: t.field({
    type: VotesType,
    args: {
      postId: t.arg.string({ required: true }),
      visitorId: t.arg.string({ required: true }),
      exists: t.arg.boolean({ required: true }),
    },
    resolve: (root, args, context) => {
      const { postId, visitorId, exists } = args;

      if (exists) {
        return PostUpvote.create(postId, visitorId);
      }

      return PostUpvote.update(postId, visitorId);
    },
  }),
}));
