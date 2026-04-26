"use client";

import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import AppointmentHistoryCard from "@/components/patient/appointmentHistoryCard";
import { useAppointments } from "@/lib/useAppointments";

export default function PatientHistoryPage() {
  const { appointments, loading, error } = useAppointments();
  return (
    <ProtectedRoute role="patient">
      <div className="space-y-4">
        <BackButton fallbackPath="/patient/dashboard" />
        <h1 className="text-2xl font-semibold">Appointment History</h1>
        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid gap-3">
          {appointments.map((appt) => (
            <AppointmentHistoryCard key={appt.id} appt={appt} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
