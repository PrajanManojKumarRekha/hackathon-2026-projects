"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import SOAPApproveButton from "@/components/doctor/SOAPApproveButton";
import { useSOAP } from "@/lib/useSOAP";

interface SoapForm {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export default function SoapReviewPage({ params }: { params: { id: string } }) {
  const { generate, approve, loading, error } = useSOAP();
  const [soap, setSoap] = useState<SoapForm>({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    generate(params.id).then((note) => {
      if (!note) return;
      setSoap({
        subjective: note.subjective,
        objective: note.objective,
        assessment: note.assessment,
        plan: note.plan,
      });
    });
  }, [generate, params.id]);

  const handleApprove = async () => {
    const result = await approve(params.id, soap);
    if (!result) return;
    setConfirmation(`Record sent successfully. ${result.fhirStatus}.`);
  };

  return (
    <ProtectedRoute role="doctor">
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <BackButton fallbackPath="/doctor/consultation" />
        <h1 className="text-2xl font-semibold">SOAP Review</h1>
        {error && <p className="text-red-600">{error}</p>}
        <textarea className="w-full rounded border p-3" placeholder="Subjective" value={soap.subjective} onChange={(e) => setSoap((prev) => ({ ...prev, subjective: e.target.value }))} />
        <textarea className="w-full rounded border p-3" placeholder="Objective" value={soap.objective} onChange={(e) => setSoap((prev) => ({ ...prev, objective: e.target.value }))} />
        <textarea className="w-full rounded border p-3" placeholder="Assessment" value={soap.assessment} onChange={(e) => setSoap((prev) => ({ ...prev, assessment: e.target.value }))} />
        <textarea className="w-full rounded border p-3" placeholder="Plan" value={soap.plan} onChange={(e) => setSoap((prev) => ({ ...prev, plan: e.target.value }))} />
        <SOAPApproveButton loading={loading} onApprove={handleApprove} />
        {confirmation && <p className="rounded bg-green-50 p-3 text-green-700">{confirmation}</p>}
      </div>
    </ProtectedRoute>
  );
}
