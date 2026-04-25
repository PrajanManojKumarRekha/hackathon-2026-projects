"use client";

import { useEffect, useState } from "react";
import { mockApi, User, Role } from "../mock_api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const parsed = JSON.parse(decodeURIComponent(token)) as { role?: Role };

        if (parsed.role === "patient" || parsed.role === "doctor") {
          setUser({
            id: "1",
            name: parsed.role === "patient" ? "John Patient" : "Dr. Smith",
            role: parsed.role,
          });
        }
      } catch {
        // Ignore invalid token values and keep user logged out.
      }
    }
  }, []);

  const login = async (role: Role) => {
    const res = await mockApi.login(role);
    document.cookie = `token=${encodeURIComponent(res.token)}; path=/`;
    setUser(res.user);

    if (role === "patient") {
      window.location.href = "/patient/dashboard";
    } else {
      window.location.href = "/doctor/dashboard";
    }
  };

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setUser(null);
    window.location.href = "/";
  };

  return { user, login, logout };
}