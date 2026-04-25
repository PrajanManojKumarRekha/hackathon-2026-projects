"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import DoctorVideoCall from "@/components/doctor/DoctorVideoCall";
import SOAPEditor from "@/components/doctor/SOAPEditor";

export default function DoctorConsultation() {
  return (
    <ProtectedRoute role="doctor">
      <DoctorVideoCall />

      <div className="mt-6">
        <h2 className="mb-2 font-semibold">SOAP Notes</h2>
        <SOAPEditor />
      </div>
    </ProtectedRoute>
  );
}