// import {
//   use,
//   StackContext,
//   Api as ApiGateway,
//   Config,
//   // Auth,
// } from 'sst/constructs';
// import { Database } from './Database';

// export function Api({ stack }: StackContext) {
//   const RESEND_API_KEY = new Config.Secret(stack, 'RESEND_API_KEY');

//   // const auth = new Auth(stack, 'auth', {
//   //   authenticator: {
//   //     handler: 'packages/functions/src/auth.handler',
//   //   },
//   // });

//   const api = new ApiGateway(stack, 'api', {
//     defaults: {
//       function: {
//         bind: [use(Database), RESEND_API_KEY],
//       },
//     },
//     routes: {
//       'POST /graphql': {
//         type: 'graphql',
//         function: {
//           handler: 'packages/functions/src/graphql/graphql.handler',
//         },
//       },
//     },
//     cors: true,
//   });

//   // auth.attach(stack, {
//   //   api,
//   // });

//   stack.addOutputs({
//     API: api.url,
//   });

//   return api;
// }
