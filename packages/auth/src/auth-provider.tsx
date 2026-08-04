import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, UserRole } from './types';
import { supabaseClient } from './supabase-client';

interface AuthContextType {
  session: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginSession: (userSession: UserSession, accessToken?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial Supabase session on mount
    supabaseClient.auth.getSession().then(({ data: { session: sbSession } }) => {
      if (sbSession?.user) {
        const role = (sbSession.user.user_metadata?.role as UserRole) || 'client';
        const userSession: UserSession = {
          userId: sbSession.user.id,
          email: sbSession.user.email || '',
          fullName:
            sbSession.user.user_metadata?.full_name ||
            sbSession.user.email?.split('@')[0] ||
            'User',
          role,
          workspaceId: sbSession.user.user_metadata?.workspace_id || 'ws_default',
          emailVerified: !!sbSession.user.email_confirmed_at,
          createdAt: sbSession.user.created_at,
        };
        setSession(userSession);
        document.cookie = `photomagic_os_session=${sbSession.access_token}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `photomagic_user_role=${role}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `photomagic_user_email=${encodeURIComponent(userSession.email)}; path=/; max-age=86400; SameSite=Lax`;
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });

    // Listen to Supabase Auth state changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, sbSession) => {
      if (sbSession?.user) {
        const role = (sbSession.user.user_metadata?.role as UserRole) || 'client';
        const userSession: UserSession = {
          userId: sbSession.user.id,
          email: sbSession.user.email || '',
          fullName:
            sbSession.user.user_metadata?.full_name ||
            sbSession.user.email?.split('@')[0] ||
            'User',
          role,
          workspaceId: sbSession.user.user_metadata?.workspace_id || 'ws_default',
          emailVerified: !!sbSession.user.email_confirmed_at,
          createdAt: sbSession.user.created_at,
        };
        setSession(userSession);
        document.cookie = `photomagic_os_session=${sbSession.access_token}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `photomagic_user_role=${role}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `photomagic_user_email=${encodeURIComponent(userSession.email)}; path=/; max-age=86400; SameSite=Lax`;
      } else {
        setSession(null);
        document.cookie = 'photomagic_os_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'photomagic_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'photomagic_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginSession = (newSession: UserSession, accessToken?: string) => {
    setSession(newSession);
    if (accessToken) {
      document.cookie = `photomagic_os_session=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
    }
    document.cookie = `photomagic_user_role=${newSession.role}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `photomagic_user_email=${encodeURIComponent(newSession.email)}; path=/; max-age=86400; SameSite=Lax`;
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
    document.cookie = 'photomagic_os_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'photomagic_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'photomagic_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        loginSession,
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
