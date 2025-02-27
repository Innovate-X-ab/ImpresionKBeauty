// src/components/admin/dashboard/EmailQueueTable.tsx
interface EmailQueueTableProps {
    emails: Array<{
      id: string;
      to: string;
      subject: string;
      status: 'pending' | 'processing' | 'failed' | 'sent';
      attempts: number;
      lastAttempt?: string;
    }>;
  }
  
  export default function EmailQueueTable({ emails }: EmailQueueTableProps) {
    return (
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
                {emails.map((email) => (
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
    );
  }