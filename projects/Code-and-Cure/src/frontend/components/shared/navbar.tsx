"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import RoleBadge from "./roleBadge";

export default function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <nav className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex gap-4">
        {user.role === "patient" ? (
          <>
            <Link href="/patient/dashboard">Dashboard</Link>
            <Link href="/patient/doctors">Doctors</Link>
            <Link href="/patient/history">History</Link>
          </>
        ) : (
          <>
            <Link href="/doctor/dashboard">Dashboard</Link>
            <Link href="/doctor/patients">Patient History</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <RoleBadge role={user.role} />
        <button className="text-red-600" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
