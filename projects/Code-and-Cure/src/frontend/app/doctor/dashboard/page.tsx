"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAppointments } from "@/lib/useAppointments";
import AppointmentQueueCard from "@/components/doctor/AppointmentQueueCard";
import Link from "next/link";

export default function DoctorDashboard() {
  const { appointments } = useAppointments();

  return (
    <ProtectedRoute role="doctor">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          Today's Appointments
        </h1>

        {appointments.length === 0 && (
          <p className="text-gray-500">
            No appointments scheduled.
          </p>
        )}

        <div className="grid gap-4">
          {appointments.map((appt) => (
            <Link
              key={appt.id}
              href={`/doctor/appointment/${appt.id}`}
            >
              <AppointmentQueueCard appt={appt} />
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}