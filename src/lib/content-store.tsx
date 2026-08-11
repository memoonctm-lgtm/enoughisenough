"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import defaultContent from "@/data/default-content.json";
import type { SiteContent } from "@/types/content";

const STORAGE_KEY = "eie-foundation-content";
const AUTH_KEY = "eie-foundation-admin-auth";

interface ContentContextValue {
  content: SiteContent;
  updateContent: (updates: Partial<SiteContent>) => void;
  resetContent: () => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

const ADMIN_PASSWORD = "eie-admin-2026";

function applyThemeColors(theme: SiteContent["theme"]) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--primary", theme.primary);
  document.documentElement.style.setProperty("--secondary", theme.secondary);
  document.documentElement.style.setProperty("--background", theme.background);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent as SiteContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContent(JSON.parse(stored) as SiteContent);
      }
      setIsAdmin(localStorage.getItem(AUTH_KEY) === "true");
    } catch {
      setContent(defaultContent as SiteContent);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyThemeColors(content.theme);
  }, [content.theme, hydrated]);

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent as SiteContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const value = useMemo(
    () => ({ content, updateContent, resetContent, isAdmin, login, logout }),
    [content, updateContent, resetContent, isAdmin, login, logout]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
