'use client';

import { API_ENDPOINTS } from '@/utils/constant';
import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
// import { authExchange } from '@urql/exchange-auth';

const urql = new Client({
  url: API_ENDPOINTS.graphql,
  exchanges: [
    cacheExchange,
    // authExchange(async (utils) => {
    //   const token = localStorage.getItem('authToken');

    //   return {
    //     addAuthToOperation(operation) {
    //       if (!token) return operation;
    //       return utils.appendHeaders(operation, {
    //         Authorization: `Bearer ${token}`,
    //       });
    //     },
    //     didAuthError(error) {
    //       return error.graphQLErrors.some(
    //         (e) => e.extensions?.code === 'FORBIDDEN'
    //       );
    //     },
    //     async refreshAuth() {
    //       // log out
    //     },
    //   };
    // }),
    fetchExchange,
  ],
  fetchOptions: () => ({
    credentials: 'include',
  }),
});

const UrqlProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={urql}>{children}</Provider>
);

export default UrqlProvider;
