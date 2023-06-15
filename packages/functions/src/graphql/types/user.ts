import { SQL } from '@graphql-rds/core/sql';
import { builder } from '../builder';
import { User } from '@graphql-rds/core/user';
import bcrypt, { getRounds } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config } from 'sst/node/config';

const UserType = builder.objectRef<SQL.Row['users']>('Users').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('user_name'),
    password: t.exposeString('password'),
    created: t.field({ type: 'Date', resolve: () => new Date() }),
  }),
});

const SignInResult = builder
  .objectRef<{ token?: string; error?: string }>('SignInResult')
  .implement({
    fields: (t) => ({
      token: t.exposeString('token', { nullable: true }),
      error: t.exposeString('error', { nullable: true }),
    }),
  });

builder.mutationFields((t) => ({
  signIn: t.field({
    type: SignInResult,
    args: {
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const { username, password } = args;
      console.log(`signing in`, username, password);

      const user = await User.getByUsername(username);

      console.log(`got the user`, user);

      if (!user) {
        return { error: 'username or password did not match our records' };
      }

      const match = bcrypt.compareSync(password, user.password);

      console.log(`bcrypt compare`, match, getRounds(user.password));

      return match
        ? {
            token: jwt.sign({ username, id: user.id }, Config.JWT_SECRET, {
              expiresIn: '7 days',
            }),
          }
        : { error: 'username or password did not match our records' };
    },
  }),
}));
