import { Category } from '@graphql-rds/core/category';

export const handler = async () => {
  const categories = ['React', 'JavaScript', 'CSS', 'Next.js'];

  console.log('Seeding database.');

  await Category.createAll(categories);
};
