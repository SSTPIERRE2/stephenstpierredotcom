'use client';

import { API_ENDPOINTS } from '@/utils/constant';
import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
// import { useSession } from 'sst/node/auth';
// import { authExchange } from '@urql/exchange-auth';

const urql = new Client({
  url: API_ENDPOINTS.graphql,
  exchanges: [
    cacheExchange,
    // I think we shouldn't need to manage this part ourselves according to the Auth construct docs https://docs.sst.dev/auth#frontend
    // authExchange(async (utils) => {
    //   const session = useSession();

    //   return {
    //     addAuthToOperation(operation) {
    //       if (session && session.type === 'user') return operation;
    //       return utils.appendHeaders(operation, {
    //         Authorization: `Bearer ${session.user.userID}`,
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
