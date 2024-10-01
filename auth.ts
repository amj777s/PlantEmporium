import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import {prisma} from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";


// import PostgresAdapter from "@auth/pg-adapter";
// import {Pool} from "pg";
// const pool:Pool = new Pool({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 20000

// })
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google,GitHub],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
})