"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import SpecialtyFilter from "@/components/patient/specialtyFilter";
import DoctorCard from "@/components/patient/doctorCard";
import DoctorMap from "@/components/patient/doctorMap";
import { useDoctors } from "@/lib/useDoctors";
import { SPECIALTY_OPTIONS } from "@/lib/ui_constants";

function DoctorsPageContent() {
  const params = useSearchParams();
  const prefilledSpecialty = params.get("specialty") || "";
  const [selectedSpecialty, setSelectedSpecialty] = useState(prefilledSpecialty);
  const { doctors, loading, error } = useDoctors(selectedSpecialty || undefined);
  const specialties = useMemo(() => [...SPECIALTY_OPTIONS], []);

  return (
    <ProtectedRoute role="patient">
      <BackButton fallbackPath="/patient/dashboard" />
      <h1 className="mb-4 text-xl">Doctors</h1>
      <SpecialtyFilter value={selectedSpecialty} specialties={specialties} onChange={setSelectedSpecialty} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
      <div className="mt-6">
        <DoctorMap doctors={doctors} />
      </div>
    </ProtectedRoute>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<p>Loading doctors...</p>}>
      <DoctorsPageContent />
    </Suspense>
  );
}
