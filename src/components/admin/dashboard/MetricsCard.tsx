// src/components/admin/dashboard/MetricsCard.tsx
interface MetricsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  }
  
  export default function MetricsCard({ title, value, icon }: MetricsCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </div>
    );
  }