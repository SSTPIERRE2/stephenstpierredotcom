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

const TotalVotesType = builder
  .objectRef<{ total: number; recentVisitorUpvotes: number }>('TotalVotes')
  .implement({
    fields: (t) => ({
      total: t.exposeInt('total'),
      recentVisitorUpvotes: t.exposeInt('recentVisitorUpvotes'),
    }),
  });

builder.queryFields((t) => ({
  totalPostUpvotes: t.field({
    type: TotalVotesType,
    args: {
      postId: t.arg.string({ required: true }),
      visitorId: t.arg.string(),
    },
    resolve: async (_, args) => {
      const { postId, visitorId } = args;
      const { votes: total } = await PostUpvote.getTotalPostUpvotes(postId);
      let recentVisitorUpvotes = 0;

      if (visitorId) {
        const result = await PostUpvote.getRecentUpvotesByVisitorId(
          postId,
          visitorId
        );

        if (result) {
          recentVisitorUpvotes = result.votes;
        }
      }

      console.log(`getting total post upvotes`, recentVisitorUpvotes, total);

      return {
        total: recentVisitorUpvotes ? total - recentVisitorUpvotes : total,
        recentVisitorUpvotes,
      };
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
      console.log(`create or update upvote`, postId, visitorId, exists);

      if (exists) {
        return PostUpvote.update(postId, visitorId);
      }

      return PostUpvote.create(postId, visitorId);
    },
  }),
}));
