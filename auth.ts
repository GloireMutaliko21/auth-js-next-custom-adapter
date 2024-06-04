import NextAuth from "next-auth";
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  type Adapter,
} from "@auth/core/adapters";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: CustomAdapter(),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Github({ allowDangerousEmailAccountLinking: true }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (account) {
        return true;
      }
      return false;
    },
  },
  // debug: true,
});

export function CustomAdapter(): Adapter {
  return {
    createUser: async (user): Promise<any> => {
      const response = await fetch("http://api_Url:3080/user", {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image
        }),
        method: "POST",
      });
      const createdUser = await response.json();
      return createdUser as AdapterUser;
    },

    getUser: async (id): Promise<any> => {
      return null;
    },

    getUserByEmail: async (email): Promise<any> => {
      return null;
    },

    getUserByAccount: async (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<any> => {
      return null;
    },

    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<any> => {
      return user;
    },

    linkAccount: async (account: AdapterAccount) => {
      return account;
    },

    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) => {
      return session;
    },

    getSessionAndUser: async (sessionToken: string): Promise<any> => {
      return sessionToken;
    },

    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<any> => {
      return session;
    },

    deleteSession: async (sessionToken: string): Promise<any> => {
      return sessionToken;
    },
  };
}

