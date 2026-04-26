"use client";

import RegisterForm from "@/components/patient/registerForm";
import { useAuth } from "@/lib/useAuth";

export default function PatientRegisterPage() {
  const { register } = useAuth();
  return (
    <div className="mx-auto mt-12 max-w-md space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Patient Registration</h1>
      <RegisterForm onSubmit={(payload) => register("patient", payload)} />
    </div>
  );
}
