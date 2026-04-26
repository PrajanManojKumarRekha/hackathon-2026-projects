"use client";

import DoctorLoginForm from "@/components/doctor/doctorLoginForm";
import { useAuth } from "@/lib/useAuth";

export default function DoctorLoginPage() {
  const { login } = useAuth();
  return <DoctorLoginForm onLogin={login} />;
}
