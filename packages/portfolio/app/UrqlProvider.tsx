'use client';

import { Client, cacheExchange, fetchExchange, Provider } from 'urql';

console.log('got the url?', process.env.NEXT_PUBLIC_GRAPHQL_URL);

const urql = new Client({
  // @ts-ignore I'll make sure it's defined
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});

const UrqlProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={urql}>{children}</Provider>
);

export default UrqlProvider;
