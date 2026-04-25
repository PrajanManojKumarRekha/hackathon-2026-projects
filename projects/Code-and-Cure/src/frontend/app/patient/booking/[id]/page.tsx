"use client";

import { useRouter } from "next/navigation";
import SlotPicker from "@/components/patient/SlotPicker";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function BookingPage() {
  const router = useRouter();

  const slots = ["9:00 AM", "10:00 AM", "2:00 PM"];

  const handleSelect = () => {
    router.push("/patient/consultation");
  };

  return (
    <ProtectedRoute role="patient">
      <h1 className="text-xl mb-4">Select a Time</h1>
      <SlotPicker slots={slots} onSelect={handleSelect} />
    </ProtectedRoute>
  );
}