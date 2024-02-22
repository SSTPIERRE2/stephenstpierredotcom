// import { SQL } from '@core/sql';
// import { builder } from '../builder';
// import { Login } from '@core/login';
// import jwt from 'jsonwebtoken';

// const LoginType = builder.objectRef<SQL.Row['login']>('Login').implement({
//   fields: (t) => ({
//     user_id: t.exposeString('user_id'),
//     auth_token: t.exposeString('auth_token'),
//   }),
// });

// const SessionResult = builder
//   .objectRef<{ error?: string; isAuthorized?: boolean }>('SessionResult')
//   .implement({
//     fields: (t) => ({
//       error: t.exposeString('error', { nullable: true }),
//       isAuthorized: t.exposeBoolean('isAuthorized', { nullable: true }),
//     }),
//   });

// builder.queryFields((t) => ({
//   verifySession: t.field({
//     type: SessionResult,
//     args: {
//       token: t.arg.string({ required: true }),
//     },
//     resolve: async (_, args) => {
//       const session = await Login.getByToken(args.token);

//       if (session) {
//         jwt.verify(session?.auth_token, (err) => {
//           if (!err) {
//             return {
//               isAuthorized: true,
//             };
//           }

//           return {
//             error: 'Authentication token expired. Please log in again.',
//           };
//         });
//       }

//       return {
//         error: 'Session not found. Please log in again.',
//       };
//     },
//   }),
// }));
