"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import AppointmentQueueCard from "@/components/doctor/appointmentQueueCard";
import { useAppointments } from "@/lib/useAppointments";

export default function DoctorDashboard() {
  const { appointments, loading, error } = useAppointments();
  return (
    <ProtectedRoute role="doctor">
      <div className="space-y-6">
        <BackButton fallbackPath="/" />
        <h1 className="text-2xl font-semibold">Today&apos;s Appointments</h1>
        {loading && <p className="text-gray-500">Loading appointments...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && appointments.length === 0 && <p className="text-gray-500">No appointments scheduled.</p>}
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <Link key={appt.id} href={`/doctor/appointment/${appt.id}`}>
              <AppointmentQueueCard appt={appt} />
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
