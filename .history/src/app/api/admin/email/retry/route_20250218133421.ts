// src/app/api/admin/email/retry/route.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export const emailService = {
    queue: {
        retryEmail: async (emailId: string) => {
            // Implement your email retry logic here
            throw new Error(`Failed to retry email with ID: ${emailId}`);
        }
    }
};

export async function POST(request: Request) {
    try {
      const session = await getServerSession(authOptions);
      
      if (session?.user?.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
  
      const { emailId } = await request.json();
      await emailService.queue.retryEmail(emailId);
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error retrying email:', error);
      return NextResponse.json(
        { error: 'Error retrying email' },
        { status: 500 }
      );
    }
  }