import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AUTH_SESSION_EXPIRED_EVENT, userFromAccessToken } from "../api";
import type { Role, User } from "../types";

type AuthContextValue = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  canCreateEdit: boolean;
  canDelete: boolean;
  isViewer: boolean;
};

const STORAGE_KEY = "playwright_practice_auth_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredUser(): User | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const stored = JSON.parse(value) as Partial<User>;
    if (typeof stored.accessToken !== "string") return null;
    const tokenUser = userFromAccessToken(stored.accessToken);
    if (stored.username !== tokenUser.username || stored.role !== tokenUser.role) return null;
    return tokenUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function hasRole(user: User | null, roles: Role[]): boolean {
  return Boolean(user && roles.includes(user.role));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  useEffect(() => {
    const clearExpiredSession = () => {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    };
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, clearExpiredSession);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, clearExpiredSession);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const login = (nextUser: User) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    };
    const logout = () => {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    };
    return {
      user,
      login,
      logout,
      canCreateEdit: hasRole(user, ["admin", "editor"]),
      canDelete: hasRole(user, ["admin"]),
      isViewer: hasRole(user, ["viewer"])
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
