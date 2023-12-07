import { Category } from '@graphql-rds/core/Category';

export const handler = async () => {
  const categories = ['React', 'JavaScript', 'CSS', 'Next.js'];

  await Category.createAll(categories);
};
