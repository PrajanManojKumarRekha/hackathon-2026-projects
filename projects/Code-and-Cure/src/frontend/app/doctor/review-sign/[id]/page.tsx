"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import SOAPApproveButton from "@/components/doctor/SOAPApproveButton";
import WorkflowStatusBadge from "@/components/doctor/workflowStatusBadge";
import { useSOAP } from "@/lib/useSOAP";

type WorkflowStatus =
  | "coding_review_required"
  | "prescription_blocked_missing_provider_credentials"
  | "ready_for_export";

interface SoapDraft {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export default function ReviewSignPage({ params }: { params: { id: string } }) {
  const { generate, approve, loading, error } = useSOAP();
  const [soap, setSoap] = useState<SoapDraft>({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });
  const [codingReviewed, setCodingReviewed] = useState(false);
  const [providerCredentialsConfirmed, setProviderCredentialsConfirmed] = useState(false);
  const [legalSigned, setLegalSigned] = useState(false);
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

  const currentStatus = useMemo<WorkflowStatus>(() => {
    if (!codingReviewed) return "coding_review_required";
    if (!providerCredentialsConfirmed) {
      return "prescription_blocked_missing_provider_credentials";
    }
    return "ready_for_export";
  }, [codingReviewed, providerCredentialsConfirmed]);

  const canExport = currentStatus === "ready_for_export" && legalSigned;

  const handleExport = async () => {
    if (!canExport) return;
    const result = await approve(params.id, soap);
    if (!result) return;
    setConfirmation(`Record exported successfully. ${result.fhirStatus}.`);
  };

  return (
    <ProtectedRoute role="doctor">
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <BackButton fallbackPath={`/doctor/soap-review/${params.id}`} />
        <h1 className="text-2xl font-semibold">Review &amp; Sign</h1>

        <p className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Legal signing is a gated workflow step. Final export is disabled until coding
          review is complete, provider credentials are confirmed, and legal sign-off is
          acknowledged.
        </p>

        <div className="flex flex-wrap gap-2">
          <WorkflowStatusBadge
            status="coding_review_required"
            active={currentStatus === "coding_review_required"}
          />
          <WorkflowStatusBadge
            status="prescription_blocked_missing_provider_credentials"
            active={currentStatus === "prescription_blocked_missing_provider_credentials"}
          />
          <WorkflowStatusBadge
            status="ready_for_export"
            active={currentStatus === "ready_for_export"}
          />
        </div>

        <div className="space-y-2 rounded border bg-white p-4">
          <h2 className="font-semibold">Workflow Checks</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              checked={codingReviewed}
              onChange={(e) => setCodingReviewed(e.target.checked)}
              type="checkbox"
            />
            Coding review complete
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              checked={providerCredentialsConfirmed}
              onChange={(e) => setProviderCredentialsConfirmed(e.target.checked)}
              type="checkbox"
            />
            Provider credentials available for prescription workflow
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              checked={legalSigned}
              onChange={(e) => setLegalSigned(e.target.checked)}
              type="checkbox"
            />
            I confirm legal signing has been completed
          </label>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="rounded border bg-white p-4 text-sm">
          <p><strong>Subjective:</strong> {soap.subjective || "—"}</p>
          <p><strong>Objective:</strong> {soap.objective || "—"}</p>
          <p><strong>Assessment:</strong> {soap.assessment || "—"}</p>
          <p><strong>Plan:</strong> {soap.plan || "—"}</p>
        </div>

        <SOAPApproveButton
          loading={loading}
          onApprove={handleExport}
          disabled={!canExport}
          label="Final Export"
        />

        {!canExport && (
          <p className="text-sm text-gray-700">
            Export is blocked until workflow status is <code>ready_for_export</code> and legal
            signing is confirmed.
          </p>
        )}

        {confirmation && <p className="rounded bg-green-50 p-3 text-green-700">{confirmation}</p>}
      </div>
    </ProtectedRoute>
  );
}
