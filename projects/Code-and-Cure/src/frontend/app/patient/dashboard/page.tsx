"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import SymptomInput from "@/components/patient/symptomInput";
import SpecialtySuggestion from "@/components/patient/specialtySuggestion";
import { mockApi } from "@/lib/mock_api";

export default function PatientDashboard() {
  const [symptom, setSymptom] = useState("");
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!symptom.trim()) return;
    setLoading(true);
    const nextSpecialty = await mockApi.suggestSpecialty(symptom);
    setSpecialty(nextSpecialty);
    setLoading(false);
  };

  return (
    <ProtectedRoute role="patient">
      <div className="p-6">
        <BackButton fallbackPath="/" />
        <h1 className="mb-4 text-xl">Patient Dashboard</h1>
        <SymptomInput value={symptom} onChange={setSymptom} onSubmit={handleSubmit} loading={loading} />
        <div className="mt-4">
          <SpecialtySuggestion
            specialty={specialty}
            onFindDoctors={() =>
              specialty && router.push(`/patient/doctors?specialty=${encodeURIComponent(specialty)}`)
            }
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
