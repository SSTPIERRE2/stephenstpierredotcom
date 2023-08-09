import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './packages/functions/src/graphql/schema.graphql',
  documents: ['./**/!(*.d).{ts,tsx}'],
  generates: {
    './packages/functions/src/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        avoidOptionals: true,
      },
    },
  },
  config: {
    scalars: {
      Date: 'Date',
      JSON: 'unknown',
    },
  },
};

export default config;
