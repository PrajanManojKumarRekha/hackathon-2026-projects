"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAppointments } from "@/lib/useAppointments";

export default function DoctorDashboard() {
  const { appointments } = useAppointments();

  return (
    <ProtectedRoute role="doctor">
      <div className="p-6">
        <h1 className="text-xl mb-4">Doctor Dashboard</h1>

        {appointments.map((appt) => (
          <div key={appt.id} className="border p-4 mb-2">
            <p>{appt.patientName}</p>
            <p>{appt.time}</p>
            <p>{appt.status}</p>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}