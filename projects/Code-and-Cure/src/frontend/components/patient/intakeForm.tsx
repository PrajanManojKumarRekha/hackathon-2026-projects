"use client";

import { FormEvent, useState } from "react";
import { IntakePayload } from "@/lib/mock_api";

export default function IntakeForm({
  loading,
  error,
  onSubmit,
}: {
  loading: boolean;
  error: string | null;
  onSubmit: (payload: IntakePayload) => Promise<void>;
}) {
  const [form, setForm] = useState<IntakePayload>({
    symptoms: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <textarea className="w-full rounded border bg-white p-3" placeholder="Current symptoms" value={form.symptoms} onChange={(e) => setForm((p) => ({ ...p, symptoms: e.target.value }))} />
      <textarea className="w-full rounded border bg-white p-3" placeholder="Allergies" value={form.allergies} onChange={(e) => setForm((p) => ({ ...p, allergies: e.target.value }))} />
      <textarea className="w-full rounded border bg-white p-3" placeholder="Current medications" value={form.medications} onChange={(e) => setForm((p) => ({ ...p, medications: e.target.value }))} />
      <textarea className="w-full rounded border bg-white p-3" placeholder="Relevant medical history" value={form.medicalHistory} onChange={(e) => setForm((p) => ({ ...p, medicalHistory: e.target.value }))} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">
        {loading ? "Submitting..." : "Submit Intake"}
      </button>
    </form>
  );
}
