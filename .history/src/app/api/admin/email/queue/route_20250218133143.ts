// src/app/api/admin/email/queue/route.ts

import { getServerSession as getNextAuthServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

interface QueueStatus {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
}

class EmailService {
    private queue = {
        getQueueStatus(): QueueStatus {
            return {
                pending: 0,
                processing: 0,
                completed: 0,
                failed: 0
            };
        }
    };

    public getQueueStatus(): QueueStatus {
        return this.queue.getQueueStatus();
    }
}

export const emailService = new EmailService();


export async function GET() {
    try {
      const session = await getNextAuthServerSession(authOptions) as CustomSession | null;
      
      if (session?.user?.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
  
      const queueStatus = emailService.getQueueStatus();
      return NextResponse.json(queueStatus);
  } catch (error) {
    console.error('Error fetching queue status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
