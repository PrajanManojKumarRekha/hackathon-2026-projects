"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import { useAppointments } from "@/lib/useAppointments";

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const { appointments } = useAppointments();
  const appointment = appointments.find((appt) => appt.id === params.id);

  return (
    <ProtectedRoute role="doctor">
      <div>
        <BackButton fallbackPath="/doctor/dashboard" />
        <h1 className="mb-4 text-xl">Appointment Detail</h1>
        {!appointment ? (
          <p>Appointment not found.</p>
        ) : (
          <>
            <p>Patient: {appointment.patientName}</p>
            <p>Time: {appointment.time}</p>
            <div className="mt-4 flex gap-3">
              <Link className="rounded bg-blue-600 px-3 py-2 text-white" href={`/doctor/intake/${appointment.id}`}>
                View Intake
              </Link>
              <Link className="rounded bg-green-600 px-3 py-2 text-white" href="/doctor/consultation">
                Join Consultation
              </Link>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
