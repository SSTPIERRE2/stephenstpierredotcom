import SchemaBuilder from '@pothos/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

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
  Context: {
    event: APIGatewayProxyEvent;
  };
}>({});

builder.addScalarType('JSON', JSONObjectResolver, {});
builder.addScalarType('Date', DateTimeResolver, {});
builder.queryType({});
builder.mutationType({});
