import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GIT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GIT_PASSWORD as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const client = await connectDB;
        const db = client.db("forum");
        const user = await db
          .collection("user_cred")
          .findOne({ id: credentials.id });

        if (!user) {
          console.log("해당 아이디은 없음");
          return null;
        }

        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as {
        id: string;
        name: string;
        email: string;
      };
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_ADAPT_PASSWORD as string,
  adapter: MongoDBAdapter(connectDB),
  pages: {
    signIn: "/login/signin",
  },
};

export default NextAuth(authOptions);
