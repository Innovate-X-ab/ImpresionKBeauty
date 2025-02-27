// src/components/admin/EmailTemplateTester.tsx
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const templates = [
  { id: 'welcome', name: 'Welcome Email' },
  { id: 'order-confirmation', name: 'Order Confirmation' },
  { id: 'shipping-confirmation', name: 'Shipping Confirmation' },
  { id: 'password-reset', name: 'Password Reset' },
];

export default function EmailTemplateTester() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success?: boolean; message?: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          email: testEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: 'Test email sent successfully!' });
      } else {
        setResult({ success: false, message: data.error || 'Failed to send test email' });
      }
    } catch (error) {
      setResult({ success: false, message: `Failed to send test email: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Email Template Tester</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Select Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700">
            Test Email Address
          </label>
          <input
            type="email"
            id="testEmail"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="test@example.com"
            required
          />
        </div>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {result.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Test Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}