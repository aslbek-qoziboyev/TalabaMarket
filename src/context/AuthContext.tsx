import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type Role = 'buyer' | 'seller';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  shopName?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  registerWithPassword: (email: string, password: string, metadata: any) => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      const mockUser = localStorage.getItem('mock_user');
      if (mockUser) setUser(JSON.parse(mockUser));
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: `${session.user.user_metadata?.firstName || ''} ${session.user.user_metadata?.lastName || ''}`.trim() || 'Foydalanuvchi',
          role: session.user.user_metadata?.role || 'buyer',
          shopName: session.user.user_metadata?.shopName,
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: `${session.user.user_metadata?.firstName || ''} ${session.user.user_metadata?.lastName || ''}`.trim() || 'Foydalanuvchi',
          role: session.user.user_metadata?.role || 'buyer',
          shopName: session.user.user_metadata?.shopName,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const registerWithPassword = async (email: string, password: string, metadata: any) => {
    if (!supabase) {
      console.log('Mock register for', email);
      localStorage.setItem('mock_pending_auth', JSON.stringify({ email, metadata }));
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
  };

  const loginWithPassword = async (email: string, password: string) => {
    if (!supabase) {
      if (password === '123456') {
        const newUser: AppUser = {
          id: 'mock_' + Date.now(),
          email,
          name: 'Test Foydalanuvchi',
          role: 'seller',
          shopName: 'Test Do\'kon',
        };
        setUser(newUser);
        localStorage.setItem('mock_user', JSON.stringify(newUser));
        return;
      }
      throw new Error('Noto\'g\'ri parol (Mock uchun 123456 kiriting)');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const verifyOtp = async (email: string, token: string) => {
    if (!supabase) {
      if (token === '123456') {
        const pending = JSON.parse(localStorage.getItem('mock_pending_auth') || '{}');
        const newUser: AppUser = {
          id: 'mock_' + Date.now(),
          email,
          name: `${pending.metadata?.firstName || ''} ${pending.metadata?.lastName || ''}`.trim() || 'Foydalanuvchi',
          role: pending.metadata?.role || 'buyer',
          shopName: pending.metadata?.shopName,
        };
        setUser(newUser);
        localStorage.setItem('mock_user', JSON.stringify(newUser));
        localStorage.removeItem('mock_pending_auth');
        return;
      }
      throw new Error('Noto\'g\'ri kod (Mock uchun 123456 kiriting)');
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });
    if (error) throw error;
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      localStorage.removeItem('mock_user');
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerWithPassword, loginWithPassword, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
