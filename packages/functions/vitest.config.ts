import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    alias: {
      '@core/': new URL('../core/src/', import.meta.url).pathname,
    },
    // AWS pauses DB clusters after some inactivity
    // It takes time for AWS to resume the DB cluster, adjust as needed
    testTimeout: 60000,
    hookTimeout: 60000,
  },
});
