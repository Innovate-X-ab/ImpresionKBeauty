// src/components/admin/EmailDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import MetricsCard from './dashboard/MetricsCard';
import EmailQueueTable from './dashboard/EmailQueueTable';
import EmailCharts from './dashboard/EmailCharts';

interface EmailMetrics {
  totalSent: number;
  totalFailed: number;
  queueLength: number;
  averageLatency: number;
  hourlyVolume: Array<{
    hour: string;
    sent: number;
    failed: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
  }>;
}

interface QueuedEmail {
  id: string;
  to: string;
  subject: string;
  status: 'pending' | 'processing' | 'failed' | 'sent';
  attempts: number;
  lastAttempt?: string;
}

export default function EmailDashboard() {
  const [metrics, setMetrics] = useState<EmailMetrics | null>(null);
  const [queuedEmails, setQueuedEmails] = useState<QueuedEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [metricsResponse, queueResponse] = await Promise.all([
        fetch('/api/admin/email/metrics'),
        fetch('/api/admin/email/queue')
      ]);

      const [metricsData, queueData] = await Promise.all([
        metricsResponse.json(),
        queueResponse.json()
      ]);

      setMetrics(metricsData);
      setQueuedEmails(queueData);
    } catch (error) {
      console.error('Error fetching email data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Email Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="Total Sent"
          value={metrics?.totalSent || 0}
          icon={<Mail className="h-8 w-8 text-blue-500" />}
        />
        <MetricsCard
          title="Failed"
          value={metrics?.totalFailed || 0}
          icon={<AlertCircle className="h-8 w-8 text-red-500" />}
        />
        <MetricsCard
          title="Queue Length"
          value={metrics?.queueLength || 0}
          icon={<Clock className="h-8 w-8 text-yellow-500" />}
        />
        <MetricsCard
          title="Avg. Latency"
          value={`${metrics?.averageLatency.toFixed(2)}ms` || '0ms'}
          icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        />
      </div>

      {/* Email Queue */}
      <EmailQueueTable emails={queuedEmails} />

      {/* Charts */}
      <EmailCharts 
        hourlyVolume={metrics?.hourlyVolume || []}
        statusBreakdown={metrics?.statusBreakdown || []}
      />
    </div>
  );
}