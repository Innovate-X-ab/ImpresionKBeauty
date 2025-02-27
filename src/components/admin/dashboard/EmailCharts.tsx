// src/components/admin/dashboard/EmailCharts.tsx
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
  
  interface EmailChartsProps {
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
  
  export default function EmailCharts({ hourlyVolume, statusBreakdown }: EmailChartsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Email Volume</h3>
          <LineChart width={500} height={300} data={hourlyVolume}>
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
          <BarChart width={500} height={300} data={statusBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </div>
      </div>
    );
  }