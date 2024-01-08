import { writeFileSync } from 'fs';
import { builder } from './builder';
import { printSchema, lexicographicSortSchema } from 'graphql';

/**
 * @NOTE When running locally, this file does not run until you actually start the NextJS app and load a page
 * You must do so whenever you need to actually update schema.graphql
 */

import './types/analytic';
import './types/category';
import './types/postUpvote';
import './types/post';
import './types/user';

export const schema = builder.toSchema({});
const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync(
  './packages/functions/src/graphql/schema.graphql',
  schemaAsString
);
