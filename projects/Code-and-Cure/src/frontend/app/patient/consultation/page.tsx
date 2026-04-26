"use client";

import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import PatientVideoCall from "@/components/patient/patientVideoCall";

export default function PatientConsultationPage() {
  return (
    <ProtectedRoute role="patient">
      <div className="space-y-4">
        <BackButton fallbackPath="/patient/dashboard" />
        <PatientVideoCall />
      </div>
    </ProtectedRoute>
  );
}
