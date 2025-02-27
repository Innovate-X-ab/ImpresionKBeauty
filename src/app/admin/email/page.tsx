// src/app/admin/email/page.tsx
'use client';

import EmailDashboard from '@/components/admin/EmailDashboard';
import EmailTemplateTester from '@/components/admin/EmailTemplateTester';

export default function EmailAdminPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <EmailDashboard />
      </div>
      <div>
        <EmailTemplateTester />
      </div>
    </div>
  );
} 