import { AuthHandler, LinkAdapter, Session } from 'sst/node/auth';
import { User } from '@graphql-rds/core/user';
import { Resend } from 'resend';
import { Config } from 'sst/node/config';

const resend = new Resend(Config.RESEND_API_KEY);

export const handler = AuthHandler({
  providers: {
    link: LinkAdapter({
      // @ts-ignore onLink doesn't need to return anything
      onLink: async (link, claims) => {
        console.log('on magic link', claims);

        // Resend requires a registered domain
        resend.emails.send({
          from: 'steve@stephenstpierre.com',
          to: 'stephencstpierre@gmail.com',
          subject: 'Your magic link',
          html: `<p>Here's your <a href="${link}">magic link</a>!</p>`,
        });
      },
      onSuccess: async (claims) => {
        console.log('Magic link success', claims);
        const { email } = claims;
        // Since the user successfully authenticated and clicked their magic link, the user will certainly exist
        const user = (await User.getByEmail(email)) as { id: string };

        return Session.cookie({
          redirect: '/dashboard',
          type: 'user',
          properties: {
            userID: user.id,
          },
        });
      },
    }),
  },
});

declare module 'sst/node/auth' {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}
