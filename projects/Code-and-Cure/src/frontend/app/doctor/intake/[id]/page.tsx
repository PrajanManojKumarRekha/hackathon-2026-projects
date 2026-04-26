"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import IntakeViewer from "@/components/doctor/intakeViewer";
import { IntakePayload } from "@/lib/mock_api";
import { useIntake } from "@/lib/useIntake";

export default function DoctorIntakePage({ params }: { params: { id: string } }) {
  const { getIntake, loading, error } = useIntake();
  const [intake, setIntake] = useState<(IntakePayload & { appointmentId: string }) | null>(null);

  useEffect(() => {
    getIntake(params.id).then((data) => setIntake(data));
  }, [getIntake, params.id]);

  return (
    <ProtectedRoute role="doctor">
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <BackButton fallbackPath="/doctor/dashboard" />
        <h1 className="text-2xl font-semibold">Patient Intake (Read Only)</h1>
        {loading && <p>Loading intake...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <IntakeViewer intake={intake} />
      </div>
    </ProtectedRoute>
  );
}
