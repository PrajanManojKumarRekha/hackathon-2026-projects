"use client";

import Link from "next/link";
import { useState } from "react";
import { Role } from "@/lib/mock_api";

interface LoginFormProps {
  role: Role;
  title: string;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
}

export default function LoginForm({
  role,
  title,
  onLogin,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await onLogin({ email, password });
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-md space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-600">Use your backend credentials to sign in.</p>
      <input
        className="w-full rounded border p-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full rounded border p-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="w-full rounded bg-blue-600 px-4 py-2 text-white" onClick={handleLogin}>
        {submitting ? "Signing in..." : role === "patient" ? "Patient Login" : "Doctor Login"}
      </button>
      {role === "patient" && (
        <p className="text-sm text-gray-600">
          Need an account?{" "}
          <Link className="text-blue-600" href="/patient/register">
            Register as patient
          </Link>
        </p>
      )}
    </div>
  );
}
