'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SessionProvider, useSession, signOut } from 'next-auth/react';

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface GuestUser {
  id: string;
  email: string;
}

const GUEST_STORAGE_KEY = 'petwago_guest_user';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  guestUser: GuestUser | null;
  setGuestUser: (user: GuestUser) => void;
  clearGuestUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthState({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [guestUser, setGuestUserState] = useState<GuestUser | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(GUEST_STORAGE_KEY);
      if (stored) setGuestUserState(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const setGuestUser = (guest: GuestUser) => {
    setGuestUserState(guest);
    try {
      sessionStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guest));
    } catch {
      // ignore
    }
  };

  const clearGuestUser = () => {
    setGuestUserState(null);
    try {
      sessionStorage.removeItem(GUEST_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: status === 'loading',
        logout: () => signOut(),
        guestUser,
        setGuestUser,
        clearGuestUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthState>{children}</AuthState>
    </SessionProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
