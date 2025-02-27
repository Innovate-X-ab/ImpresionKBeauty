// src/app/api/admin/email/metrics/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { emailService } from '@/lib/email/service';
import {prisma} from '@/lib/prisma';

export interface IEmailProvider {
  send: (to: string, subject: string, body: string) => Promise<void>;
  getMetrics: () => {
    totalSent: number;
    totalFailed: number;
    deliveryRate: number;
  };
}

export class EmailService implements IEmailProvider {
  private emailProvider: IEmailProvider;

  constructor(emailProvider: IEmailProvider) {
    this.emailProvider = emailProvider;
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.emailProvider.send(to, subject, body);
  }

  getMetrics(): { totalSent: number; totalFailed: number; deliveryRate: number; } {
    return this.emailProvider.getMetrics();
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const metrics = emailService.getMetrics();
    
    // Add hourly volume data
    const hourlyVolume = await prisma.emailLog.groupBy({
      by: ['hour'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });

    return NextResponse.json({
      ...metrics,
      hourlyVolume,
    });
  } catch (error) {
    console.error('Error fetching email metrics:', error);
    return NextResponse.json(
      { error: 'Error fetching metrics' },
      { status: 500 }
    );
  }
}