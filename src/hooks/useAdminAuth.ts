import { useCallback, useEffect, useState } from "react";

const CREDS_KEY = "maneb.admin.creds";
const SESSION_KEY = "maneb.admin.session";
const DEFAULT_USER = "0000";
const DEFAULT_PASS = "0000";

interface Creds {
  username: string;
  password: string;
}

function readCreds(): Creds {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.username && parsed?.password) return parsed;
    }
  } catch {
    /* ignore */
  }
  return { username: DEFAULT_USER, password: DEFAULT_PASS };
}

function readSession(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean>(() => readSession());
  const [creds, setCreds] = useState<Creds>(() => readCreds());

  useEffect(() => {
    const sync = () => {
      setAuthed(readSession());
      setCreds(readCreds());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const login = useCallback((u: string, p: string): boolean => {
    const c = readCreds();
    if (u === c.username && p === c.password) {
      localStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  const updateCreds = useCallback((u: string, p: string) => {
    const next = { username: u, password: p };
    localStorage.setItem(CREDS_KEY, JSON.stringify(next));
    setCreds(next);
  }, []);

  return { authed, creds, login, logout, updateCreds };
}
