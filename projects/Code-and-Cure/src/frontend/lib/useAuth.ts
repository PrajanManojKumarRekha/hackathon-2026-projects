"use client";

import { useEffect, useSyncExternalStore } from "react";
import { mockApi, Role, User } from "./mock_api";

type AuthSnapshot = {
  user: User | null;
  ready: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001/api/v1";
const TOKEN_KEY = "access_token";
const SERVER_SNAPSHOT: AuthSnapshot = { user: null, ready: false };

let snapshot: AuthSnapshot = { user: null, ready: false };
let bootstrapped = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setSnapshot(next: AuthSnapshot) {
  snapshot = next;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getClientSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  const fromLocalStorage = window.localStorage.getItem(TOKEN_KEY);
  if (fromLocalStorage) return fromLocalStorage;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${TOKEN_KEY}=`))
      ?.split("=")[1] ?? null
  );
}

function saveToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/`;
}

function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; Max-Age=0; path=/`;
}

async function bootstrapAuthStore() {
  if (bootstrapped || typeof window === "undefined") return;
  bootstrapped = true;

  const token = readToken();
  if (!token) {
    setSnapshot({ user: null, ready: true });
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      clearToken();
      setSnapshot({ user: null, ready: true });
      return;
    }

    const data = (await response.json()) as { user_id: string; role: Role };
    const role = data.role === "doctor" ? "doctor" : "patient";
    setSnapshot({
      user: {
        id: data.user_id,
        role,
        name: role === "doctor" ? "Doctor User" : "Patient User",
      },
      ready: true,
    });
  } catch {
    setSnapshot({ user: null, ready: true });
  }
}

export function useAuth() {
  const authState = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    void bootstrapAuthStore();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password.");
    }

    const data = (await response.json()) as { access_token: string; role: Role };
    const role = data.role === "doctor" ? "doctor" : "patient";
    saveToken(data.access_token);
    setSnapshot({
      user: {
        id: "session-user",
        role,
        name: role === "doctor" ? "Doctor User" : "Patient User",
      },
      ready: true,
    });
    window.location.href = role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard";
  };

  const register = async (role: Role, payload: { name: string; email: string }) => {
    const res = await mockApi.register(role, payload);
    document.cookie = `token=${encodeURIComponent(res.token)}; path=/`;
    window.location.href = role === "patient" ? "/patient/dashboard" : "/doctor/dashboard";
  };

  const logout = () => {
    clearToken();
    setSnapshot({ user: null, ready: true });
    window.location.href = "/";
  };

  return { user: authState.user, ready: authState.ready, login, register, logout };
}
