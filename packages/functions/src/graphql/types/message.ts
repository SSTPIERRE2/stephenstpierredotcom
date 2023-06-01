import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { Message } from '@graphql-rds/core/Message';

const MessageType = builder.objectRef<SQL.Row['message']>('Message').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    text: t.exposeString('text'),
    email: t.exposeString('email'),
    created: t.field({ type: 'Date', resolve: () => new Date() }),
  }),
});

builder.queryFields((t) => ({
  Messages: t.field({
    type: [MessageType],
    resolve: () => Message.list(),
  }),
}));

builder.mutationFields((t) => ({
  createMessage: t.field({
    type: MessageType,
    args: {
      text: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Message.create(args.text, args.email),
  }),
}));
