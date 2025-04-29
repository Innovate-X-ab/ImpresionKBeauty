// app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
        // Add debug log
        console.log('Session user role:', session.user.role);
      }
      return session;
    },
    async signIn({ user, account }) {
      // Handle Google login
      if (account?.provider === 'google') {
        try {
          // Check if user exists in our database by email first
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          if (!existingUser) {
            // Also check by ID
            existingUser = await prisma.user.findUnique({
              where: { id: user.id }
            });
          }
          
          if (!existingUser) {
            // If user doesn't exist at all, create a new user
            // Check if this is the admin email
            const isAdmin = user.email === 'arturoalbert123@gmail.com';
            
            // Create a new user if they don't exist
            try {
              existingUser = await prisma.user.create({
                data: {
                  id: user.id, // Use the OAuth provider's ID
                  email: user.email!,
                  name: user.name,
                  password: "",
                  role: isAdmin ? 'ADMIN' : 'USER', // Set ADMIN role for admin email
                }
              });
            } catch (error) {
              const createError = error as PrismaClientKnownRequestError;
              console.error("Error creating user during OAuth sign-in:", createError);
              
              // If there was an error (like duplicate email), try to find the user again
              if (createError.code === 'P2002') { // Unique constraint error
                existingUser = await prisma.user.findUnique({
                  where: { email: user.email! }
                });
                
                if (existingUser) {
                  console.log("Found existing user after create error:", existingUser.id);
                }
              }
              
              if (!existingUser) {
                throw createError; // Re-throw if we still don't have a user
              }
            }
          } else {
            console.log("Found existing user during OAuth sign-in:", existingUser.id);
          }
          
          // Update the user object with the role from database
          user.role = existingUser.role;
          // We need to ensure we use the database ID consistently
          user.id = existingUser.id;
          
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