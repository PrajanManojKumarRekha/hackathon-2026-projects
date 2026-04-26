"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/protectedRoute";
import BackButton from "@/components/shared/backButton";
import SlotPicker from "@/components/patient/slotPicker";
import BookingConfirm from "@/components/patient/bookingConfirm";
import { Doctor, mockApi } from "@/lib/mock_api";
import { useAppointments } from "@/lib/useAppointments";

export default function BookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { createAppointment } = useAppointments();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    const doctorId = params.id;
    Promise.all([mockApi.getDoctorById(doctorId), mockApi.getAvailableSlots(doctorId)])
      .then(([doctorData, slotData]) => {
        setDoctor(doctorData);
        setSlots(slotData);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleConfirm = async () => {
    if (!selectedSlot || !doctor) return;
    const created = await createAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      time: selectedSlot,
    });
    router.push(`/patient/intake/${created.id}`);
  };

  return (
    <ProtectedRoute role="patient">
      <div className="space-y-4">
        <BackButton fallbackPath="/patient/doctors" />
        <h1 className="text-xl font-semibold">Book Appointment</h1>
        {doctor && (
          <div className="rounded-xl border bg-white p-4">
            <p className="font-medium">{doctor.name}</p>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        )}
        {loading ? (
          <p>Loading slots...</p>
        ) : (
          <SlotPicker slots={slots} onSelect={setSelectedSlot} selectedSlot={selectedSlot} />
        )}
        <BookingConfirm selectedSlot={selectedSlot} onConfirm={handleConfirm} />
      </div>
    </ProtectedRoute>
  );
}
