import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDB } from '@petbackend/db';
import User from '@petbackend/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        await connectDB();
        await User.findOneAndUpdate(
          { email: user.email.toLowerCase() },
          { $set: { name: user.name, image: user.image } },
          { upsert: true, setDefaultsOnInsert: true }
        );
        return true;
      } catch (error) {
        console.error(`[auth] signIn callback failed for ${user.email}:`, error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: user.email.toLowerCase() });
          if (dbUser) token.userId = dbUser._id.toString();
        } catch (error) {
          console.error(`[auth] jwt callback failed for ${user.email}:`, error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
