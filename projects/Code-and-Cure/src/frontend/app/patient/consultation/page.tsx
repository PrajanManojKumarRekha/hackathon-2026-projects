"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import PatientVideoCall from "@/components/patient/PatientVideoCall";

export default function PatientConsultation() {
  return (
    <ProtectedRoute role="patient">
      <PatientVideoCall />
    </ProtectedRoute>
  );
}