// contexts/AdminContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(session?.user?.role === 'ADMIN');
  }, [session]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}