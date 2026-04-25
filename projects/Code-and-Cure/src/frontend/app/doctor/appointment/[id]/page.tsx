"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function AppointmentDetail() {
  return (
    <ProtectedRoute role="doctor">
      <div>
        <h1 className="text-xl mb-4">Appointment Detail</h1>
        <p>Patient: John Patient</p>
        <p>Time: 10:00 AM</p>
      </div>
    </ProtectedRoute>
  );
}