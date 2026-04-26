"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/shared/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-center text-3xl font-bold">Code &amp; Cure Telehealth</h1>
      <p className="max-w-xl text-center text-gray-600">
        Choose your role to enter the correct portal experience.
      </p>
      <Button onClick={() => router.push("/patient/login")}>I am a Patient</Button>
      <Button onClick={() => router.push("/doctor/login")} variant="secondary">
        I am a Doctor
      </Button>
    </div>
  );
}
