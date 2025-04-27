// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export interface AuthContextType {
  currentUser: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ currentUser: session?.user || null, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};