import React, { createContext, useContext, useState } from 'react';
import { UserSession } from './types';

interface AuthContextType {
  session: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (mockSession: UserSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>({
    userId: 'usr_demo_101',
    email: 'client@photomagic.studio',
    fullName: 'Eleanor Vance',
    role: 'client',
    workspaceId: 'ws_photomagic_demo',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (newSession: UserSession) => {
    setSession(newSession);
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
