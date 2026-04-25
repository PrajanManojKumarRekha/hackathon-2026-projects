"use client";

import { useSearchParams } from "next/navigation";
import { useDoctors } from "@/lib/useDoctors";
import DoctorCard from "@/components/patient/DoctorCard";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function DoctorsPage() {
  const params = useSearchParams();
  const specialty = params.get("specialty") || undefined;

  const { doctors, loading } = useDoctors(specialty);

  return (
    <ProtectedRoute role="patient">
      <h1 className="text-xl mb-4">Doctors</h1>

      {loading && <p>Loading...</p>}

      <div className="grid gap-4">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </ProtectedRoute>
  );
}