"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import IntakeForm from "@/components/patient/intakeForm";
import { IntakePayload } from "@/lib/mock_api";
import { useIntake } from "@/lib/useIntake";

export default function PatientIntakePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { submitIntake, loading, error } = useIntake();

  const onSubmit = async (payload: IntakePayload) => {
    const result = await submitIntake(params.id, payload);
    if (result?.success) router.push("/patient/consultation");
  };

  return (
    <ProtectedRoute role="patient">
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <BackButton fallbackPath="/patient/dashboard" />
        <h1 className="text-2xl font-semibold">Patient Intake Form</h1>
        <IntakeForm loading={loading} error={error} onSubmit={onSubmit} />
      </div>
    </ProtectedRoute>
  );
}
