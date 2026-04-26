"use client";

import LoginForm from "@/components/patient/loginForm";
import { useAuth } from "@/lib/useAuth";

export default function PatientLoginPage() {
  const { login } = useAuth();
  return <LoginForm role="patient" title="Patient Login" onLogin={login} />;
}
