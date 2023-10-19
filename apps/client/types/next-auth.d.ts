import NextAuth, { DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User {
    accessToken: string
    // user: {
    //   /** The user's postal address. */
    //   address: string
    // } & DefaultUser["user"]
  }
  interface Session {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string
  }
}
