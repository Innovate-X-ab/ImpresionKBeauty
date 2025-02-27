// app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

// Type augmentation for next-auth
declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }
  
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"]
  }
}

// Add this export to force static generation
export const dynamic = "force-static";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // For Google sign-in users who don't have a password
        if (!user.password) {
          throw new Error("Please use Google sign-in for this account");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      
      // Keep the Google provider info in the token
      if (account?.provider === 'google') {
        token.provider = 'google';
      }
      
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Handle Google login
      if (account?.provider === 'google') {
        try {
          // Check if user exists in our database
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          if (!existingUser) {
            // Create a new user if they don't exist
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                // No password for Google users
                password: "",
                role: 'USER', // Default role
              }
            });
          }
          
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      
      return true;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };