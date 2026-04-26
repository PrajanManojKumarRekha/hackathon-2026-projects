"use client";

import { useState } from "react";
import { IntakePayload, mockApi } from "./mock_api";

export function useIntake() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitIntake = async (appointmentId: string, payload: IntakePayload) => {
    try {
      setLoading(true);
      setError(null);
      return await mockApi.submitIntake(appointmentId, payload);
    } catch {
      setError("Unable to submit intake form.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getIntake = async (appointmentId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await mockApi.getIntakeByAppointment(appointmentId);
    } catch {
      setError("Unable to load intake form.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitIntake, getIntake, loading, error };
}
