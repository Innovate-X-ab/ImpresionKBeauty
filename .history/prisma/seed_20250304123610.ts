// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'arturoalbert123@gmail.com',
      },
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'arturoalbert123@gmail.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Add sample products
    const sampleProducts = [
      {
        name: 'COSRX Advanced Snail Mucin Power Essence',
        brand: 'COSRX',
        description: 'A lightweight essence containing 96% snail secretion filtrate for intense hydration.',
        price: 21.99,
        category: 'serum',
        isVegan: false,
        isCrueltyFree: true,
        stock: 50,
        images: JSON.stringify(['/images/placeholder-300x300.jpg']),
      },
      // Add more sample products as needed
    ];

    for (const product of sampleProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: {
          name: product.name,
        },
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: product,
        });
        console.log(`Product ${product.name} created successfully`);
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();