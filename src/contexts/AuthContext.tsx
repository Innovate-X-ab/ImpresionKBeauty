// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type AuthContextType = {
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
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
    <AuthContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};