import SchemaBuilder from '@pothos/core';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

export const builder = new SchemaBuilder<{
  Scalars: {
    JSON: {
      Input: unknown;
      Output: unknown;
    };
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({});

builder.addScalarType('JSON', JSONResolver, {});
builder.addScalarType('Date', DateTimeResolver, {});
builder.queryType({});
builder.mutationType({});
