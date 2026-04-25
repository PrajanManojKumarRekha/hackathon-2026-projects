"use client";

import { useAuth } from "@/lib/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="flex justify-between p-4 border-b">
      <div className="flex gap-4">
        {user.role === "patient" && (
          <>
            <Link href="/patient/dashboard">Dashboard</Link>
            <Link href="/patient/doctors">Doctors</Link>
          </>
        )}

        {user.role === "doctor" && (
          <>
            <Link href="/doctor/dashboard">Dashboard</Link>
          </>
        )}
      </div>

      <button onClick={logout} className="text-red-600">
        Logout
      </button>
    </nav>
  );
}