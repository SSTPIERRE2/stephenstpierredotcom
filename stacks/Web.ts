import { use, StackContext, NextjsSite } from 'sst/constructs';
import { Api } from './Api.js';

export function Web({ stack }: StackContext) {
  const api = use(Api);
  const dashboard = new NextjsSite(stack, 'dashboard', {
    path: 'packages/dashboard',
    environment: {
      GRAPHQL_URL: api.url + '/graphql',
    },
  });
  const portfolio = new NextjsSite(stack, 'portfolio', {
    path: 'packages/portfolio',
    environment: {
      GRAPHQL_URL: api.url + '/graphql',
    },
  });

  stack.addOutputs({
    dashboardUrl: dashboard.url,
    portfolioUrl: portfolio.url,
  });
}
