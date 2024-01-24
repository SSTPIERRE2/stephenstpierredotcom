import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '@graphql-rds/core/': new URL('../core/src/', import.meta.url).pathname,
    },
    // AWS pauses DB clusters after some inactivity
    // It takes time for AWS to resume the DB cluster, adjust as needed
    testTimeout: 60000,
    hookTimeout: 60000,
  },
});
