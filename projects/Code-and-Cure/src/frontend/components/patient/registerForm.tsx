"use client";

import { FormEvent, useState } from "react";

export default function RegisterForm({
  onSubmit,
}: {
  onSubmit: (payload: { name: string; email: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    await onSubmit({ name, email });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input className="w-full rounded-lg border p-3" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full rounded-lg border p-3" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white" type="submit">
        Create account
      </button>
    </form>
  );
}
