// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`Session user ID: ${session.user.id || 'undefined'}`);
    console.log(`Session user email: ${session.user.email || 'undefined'}`);

    // First approach: Try to find a user with the email from the session
    let userId = session.user.id;
    
    if (session.user.email) {
      const dbUser = await prisma.user.findUnique({
        where: { 
          email: session.user.email 
        },
        select: {
          id: true
        }
      });
      
      if (dbUser) {
        console.log(`Found user in database with email ${session.user.email}, ID: ${dbUser.id}`);
        userId = dbUser.id;
      }
    }

    console.log(`Using userId for order query: ${userId}`);

    // Fetch orders for this user
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${orders.length} orders for user ${userId}`);

    // Transform the orders to match the expected format in the frontend
    const formattedOrders = orders.map(order => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        total: parseFloat(order.totalAmount.toString()),
        orderItems: order.orderItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
          product: {
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price.toString()),
            images: item.product.images
          }
        }))
      };
    });

    // Debug log the first order's structure
    if (formattedOrders.length > 0) {
      console.log('First formatted order sample:', JSON.stringify({
        id: formattedOrders[0].id,
        status: formattedOrders[0].status,
        orderItemCount: formattedOrders[0].orderItems.length,
        sampleOrderItem: formattedOrders[0].orderItems[0]
      }, null, 2));
    }

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}