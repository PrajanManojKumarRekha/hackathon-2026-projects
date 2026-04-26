"use client";

import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import PatientHistoryCard from "@/components/doctor/patientHistoryCard";
import { useAppointments } from "@/lib/useAppointments";

export default function DoctorPatientsPage() {
  const { appointments, loading, error } = useAppointments();
  return (
    <ProtectedRoute role="doctor">
      <div className="space-y-4">
        <BackButton fallbackPath="/doctor/dashboard" />
        <h1 className="text-2xl font-semibold">Patient History</h1>
        {loading && <p>Loading patients...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid gap-3">
          {appointments.map((appt) => (
            <PatientHistoryCard key={appt.id} appt={appt} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
