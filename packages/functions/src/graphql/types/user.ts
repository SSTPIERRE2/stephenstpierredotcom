// import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { User } from '@graphql-rds/core/user';
import bcrypt, { getRounds } from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { Config } from 'sst/node/config';
// import { Login } from '@stevestpierredotcom/core/login';

// const UserType = builder.objectRef<SQL.Row['users']>('Users').implement({
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     username: t.exposeString('user_name'),
//     password: t.exposeString('password'),
//     created: t.field({ type: 'Date', resolve: () => new Date() }),
//   }),
// });

// const signToken = (id: string) => {
//   return jwt.sign({ id }, Config.JWT_SECRET, {
//     expiresIn: '7 days',
//   });
// };

const SignInResult = builder
  .objectRef<{ isAuthorized?: boolean; error?: string }>('SignInResult')
  .implement({
    fields: (t) => ({
      isAuthorized: t.exposeBoolean('isAuthorized', { nullable: true }),
      error: t.exposeString('error', { nullable: true }),
    }),
  });

builder.mutationFields((t) => ({
  signIn: t.field({
    type: SignInResult,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const { email, password } = args;
      console.log(`signing in`, email, password);

      const user = await User.getByEmail(email);

      console.log(`got the user`, user);

      if (!user) {
        return { error: 'email or password did not match our records' };
      }

      const match = bcrypt.compareSync(password, user.password);

      console.log(`bcrypt compare`, match, getRounds(user.password));

      if (match) {
        // const token = signToken(user.id);
        // Login.setToken(user.id, token);
        return { isAuthorized: true };
      } else {
        return { error: 'email or password did not match our records' };
      }
    },
  }),
}));
