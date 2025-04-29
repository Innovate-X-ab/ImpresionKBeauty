// src/app/api/admin/email/retry/route.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
//import { emailService } from "@/lib/email/service";

// Create a helper function to retry emails
async function retryEmail(emailId: string) {
  // Implement your email retry logic here
  // This would typically integrate with your actual email service
  console.log(`Attempting to retry email with ID: ${emailId}`);
  
  // For now, we'll just throw an error to simulate a failure
  throw new Error(`Failed to retry email with ID: ${emailId}`);
}

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
    await retryEmail(emailId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error retrying email:', error);
    return NextResponse.json(
      { error: 'Error retrying email' },
      { status: 500 }
    );
  }
}