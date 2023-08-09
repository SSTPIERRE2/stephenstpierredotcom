import { writeFileSync } from 'fs';
import { builder } from './builder';
import { printSchema, lexicographicSortSchema } from 'graphql';

import './types/analyticsEvent';
import './types/message';
import './types/user';

export const schema = builder.toSchema({});
const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync('/packages/functions/src/graphql/schema.graphql', schemaAsString);
