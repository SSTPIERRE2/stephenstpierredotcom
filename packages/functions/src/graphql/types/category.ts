import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { Category } from '@graphql-rds/core/Category';

const CategoryType = builder
  .objectRef<SQL.Row['category']>('Category')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      created: t.field({ type: 'Date', resolve: () => new Date() }),
    }),
  });

builder.queryFields((t) => ({
  Categories: t.field({
    type: [CategoryType],
    resolve: () => Category.list(),
  }),
}));
