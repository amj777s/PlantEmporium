import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import {prisma} from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend  from "next-auth/providers/resend";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google,GitHub,Resend],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
})