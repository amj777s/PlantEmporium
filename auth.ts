import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";


const providers: Provider[] = [Google, GitHub]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: providers,
  session: {
    strategy: 'database'
  },
  pages: {
    signIn: '/signin'
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
