import { builder } from '../builder';
import { Post } from '@graphql-rds/core/post';

const ViewsType = builder.objectRef<{ views: number }>('Post').implement({
  fields: (t) => ({
    views: t.exposeInt('views'),
  }),
});

builder.mutationFields((t) => ({
  incrementViews: t.field({
    type: ViewsType,
    args: {
      postId: t.arg.string({ required: true }),
    },
    resolve: (_root, args) => {
      console.log(`INCREMENT VIEWS!! DO ITTTT`, args);

      return Post.incrementViews(args.postId);
    },
  }),
}));
