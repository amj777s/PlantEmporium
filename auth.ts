import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub, Resend],
  session: {
    strategy: 'database'
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    }
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await prisma.shoppingCart.create({
          data: {
            user_id: user.id
          }
        })
      }
    },
  }
});