// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Use edge runtime with accelerate extension
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// For Decimal support, we'll need to handle it manually since Decimal from @prisma/client
// might not be available in the edge runtime.
export type Decimal = {
  toFixed: (precision: number) => string
  toString: () => string
}