import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './packages/functions/src/graphql/schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['./packages/functions/src/**/*.{ts,tsx}'],
  generates: {
    './packages/functions/src/gql/': {
      preset: 'client',
      plugins: ['typescript'],
    },
    './packages/functions/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
  config: {
    scalars: {
      Date: 'Date',
    },
  },
};

export default config;
