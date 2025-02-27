// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// This approach prevents multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// For handling decimal values in your application
export type Decimal = {
  toFixed: (precision: number) => string
  toString: () => string
}