"use client";

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import type { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  login: (role: 'buyer' | 'seller', name?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('Hemmatorg_authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth user from localStorage", error);
      localStorage.removeItem('Hemmatorg_authUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback((role: 'buyer' | 'seller', name?: string) => {
    const defaultName = role === 'seller' ? 'Test Säljare' : 'Test Köpare';
    const userName = name || defaultName;
    const mockUser: AuthUser = { 
      id: `mock-${role}-${Date.now()}`, 
      name: userName, 
      role 
    };
    localStorage.setItem('Hemmatorg_authUser', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('Hemmatorg_authUser');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
