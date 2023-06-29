import {
  AuthHandler,
  GoogleAdapter,
  LinkAdapter,
  Session,
} from 'sst/node/auth';
import { User } from '@graphql-rds/core/user';
import { Resend } from 'resend';
import { Config } from 'sst/node/config';

const resend = new Resend(Config.RESEND_API_KEY);

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: 'XXXX',
      onSuccess: async (tokenset) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset.claims()),
        };
      },
    }),
    link: LinkAdapter({
      onLink: async (link, claims) => {
        const { email } = claims;
        // const user = await User.getByUsername(email);
        console.log('on magic link', claims);
        // maybe use aws simple email service to send it?
        resend.emails.send({
          from: 'steve@stevestpierre.com',
          to: 'stephencstpierre@gmail.com',
          subject: 'Your magic link',
          html: `<p>Here's your <a href="${link}">magic link</a>!</p>`,
        });
      },
      onSuccess: async (claims) => {
        console.log('Magic link success', claims);
        return Session.cookie({
          redirect: '/dashboard',
          type: 'user',
          properties: {
            userID: '1',
          },
        });
      },
    }),
  },
});

// declare module 'sst/node/auth' {
//   export interface SessionTypes {
//     user: {
//       userID: string;
//     };
//   }
// }
