// export * as Login from './login';

// import { ulid } from 'ulid';
// import { SQL } from './sql';

// export function getByToken(authToken: string) {
//   return SQL.DB.selectFrom('login')
//     .selectAll()
//     .where('auth_token', '=', authToken)
//     .executeTakeFirst();
// }

// export function deleteToken(authToken: string) {
//   return SQL.DB.deleteFrom('login')
//     .where('auth_token', '=', authToken)
//     .execute();
// }

// export async function setToken(userId: string, authToken: string) {
//   const result = await SQL.DB.insertInto('login')
//     .values({
//       id: ulid(),
//       user_id: userId,
//       auth_token: authToken,
//     })
//     .executeTakeFirst();

//   return result;
// }
