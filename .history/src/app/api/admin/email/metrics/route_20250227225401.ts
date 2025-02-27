// src/app/api/admin/email/metrics/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// Define the interface for hourly volume data entries
interface HourlyVolumeEntry {
  hour: string;
  count: number;
}

// Define the type for an email log
interface EmailLog {
  createdAt: Date;
}

// Add this export to force static generation
export const dynamic = "force-static";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // We'll use placeholder metrics for now
    // You could integrate with your email service to get real metrics
    const metrics = {
      totalSent: 0,
      totalFailed: 0,
      deliveryRate: 0
    };
    
    // Generate hourly data for the last 24 hours
    const hourlyVolumeData: HourlyVolumeEntry[] = [];
    const now = new Date();
    
    // Looking at the schema, it seems 'createdAt' is a valid field we can use
    const emailLogs = await prisma.emailLog.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });
    
    // Group manually by hour
    const hourlyGroups = new Map<string, number>();
    
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(now);
      hourDate.setHours(now.getHours() - i);
      const hourKey = hourDate.getHours().toString();
      hourlyGroups.set(hourKey, 0);
    }
    
    // Count emails per hour
    emailLogs.forEach((log: EmailLog) => {
      const logHour = new Date(log.createdAt).getHours().toString();
      if (hourlyGroups.has(logHour)) {
        hourlyGroups.set(logHour, hourlyGroups.get(logHour)! + 1);
      }
    });
    
    // Convert to array for response
    hourlyGroups.forEach((count, hour) => {
      hourlyVolumeData.push({
        hour,
        count
      });
    });

    return NextResponse.json({
      ...metrics,
      hourlyVolume: hourlyVolumeData,
    });
  } catch (error) {
    console.error('Error fetching email metrics:', error);
    return NextResponse.json(
      { error: 'Error fetching metrics' },
      { status: 500 }
    );
  }
}