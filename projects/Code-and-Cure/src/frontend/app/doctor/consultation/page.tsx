"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import DoctorVideoCall from "@/components/doctor/doctorVideoCall";
import SOAPEditor from "@/components/doctor/SOAPEditor";

export default function DoctorConsultationPage() {
  const router = useRouter();
  return (
    <ProtectedRoute role="doctor">
      <div className="space-y-4">
        <BackButton fallbackPath="/doctor/dashboard" />
        <DoctorVideoCall />
      </div>
      <div className="mt-2">
        <h2 className="mb-2 font-semibold">SOAP Notes</h2>
        <SOAPEditor />
        <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white" onClick={() => router.push("/doctor/soap-review/1")}>
          End Session and Generate SOAP Note
        </button>
      </div>
    </ProtectedRoute>
  );
}
