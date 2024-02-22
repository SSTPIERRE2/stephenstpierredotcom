import { SQL } from '@core/sql';
import { builder } from '../builder';
import { Category } from '@core/category';

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
