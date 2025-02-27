// src/app/admin/email/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';

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
      // Fetch metrics
      const metricsResponse = await fetch('/api/admin/email/metrics');
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);

      // Fetch queued emails
      const queueResponse = await fetch('/api/admin/email/queue');
      const queueData = await queueResponse.json();
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
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Sent</p>
              <p className="text-2xl font-bold">{metrics?.totalSent}</p>
            </div>
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Failed</p>
              <p className="text-2xl font-bold">{metrics?.totalFailed}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Queue Length</p>
              <p className="text-2xl font-bold">{metrics?.queueLength}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Avg. Latency</p>
              <p className="text-2xl font-bold">{metrics?.averageLatency.toFixed(2)}ms</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Email Queue */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Email Queue</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Attempts</th>
                  <th className="px-4 py-2 text-left">Last Attempt</th>
                </tr>
              </thead>
              <tbody>
                {queuedEmails.map((email) => (
                  <tr key={email.id}>
                    <td className="px-4 py-2">{email.id}</td>
                    <td className="px-4 py-2">{email.to}</td>
                    <td className="px-4 py-2">{email.subject}</td>
                    <td className="px-4 py-2">
                      <span 
                        className={`px-2 py-1 rounded text-sm ${
                          email.status === 'sent' ? 'bg-green-100 text-green-800' :
                          email.status === 'failed' ? 'bg-red-100 text-red-800' :
                          email.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{email.attempts}</td>
                    <td className="px-4 py-2">
                      {email.lastAttempt ? new Date(email.lastAttempt).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Email Volume</h3>
          <LineChart width={500} height={300} data={metrics?.hourlyVolume || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#3B82F6" />
            <Line type="monotone" dataKey="failed" stroke="#EF4444" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Delivery Status</h3>
          <BarChart width={500} height={300} data={metrics?.statusBreakdown || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}