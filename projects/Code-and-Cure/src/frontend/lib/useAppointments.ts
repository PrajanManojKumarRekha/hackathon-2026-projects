"use client";

import { useMemo, useState } from "react";
import { Appointment, mockApi } from "./mock_api";
import { useAuth } from "./useAuth";

export function useAppointments() {
  const { user } = useAuth();
  const [createdAppointments, setCreatedAppointments] = useState<Appointment[]>([]);

  const appointments = useMemo(() => {
    const base = mockApi.getAppointmentsSync();
    if (!user) return [];
    const filtered =
      user.role === "patient"
        ? base.filter((appt) => appt.patientId === user.id)
        : base.filter((appt) => appt.doctorId === user.id);
    return [...createdAppointments, ...filtered];
  }, [createdAppointments, user]);

  const createAppointment = async (input: {
    doctorId: string;
    doctorName: string;
    time: string;
  }) => {
    if (!user || user.role !== "patient") throw new Error("Only patients can create appointments.");
    const newAppointment: Appointment = {
      id: `${Date.now()}`,
      patientId: user.id,
      doctorId: input.doctorId,
      patientName: user.name,
      doctorName: input.doctorName,
      time: input.time,
      status: "upcoming",
    };
    setCreatedAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  return {
    appointments,
    loading: false,
    error: null as string | null,
    fetchAppointments: async () => appointments,
    createAppointment,
  };
}
