import { use, StackContext, NextjsSite } from 'sst/constructs';
import { Api } from './Api.js';

export function Web({ stack }: StackContext) {
  const api = use(Api);

  const portfolio = new NextjsSite(stack, 'portfolio', {
    path: 'packages/portfolio',
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
  });

  stack.addOutputs({
    portfolioUrl: portfolio.url,
  });
}
