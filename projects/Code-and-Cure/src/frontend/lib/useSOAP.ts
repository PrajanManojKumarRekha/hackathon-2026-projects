"use client";

import { useState } from "react";
import { mockApi, SoapNote } from "./mock_api";

type SoapDraft = Omit<SoapNote, "approved">;

export function useSOAP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (appointmentId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await mockApi.generateSoap(appointmentId);
    } catch {
      setError("Unable to generate SOAP note.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const approve = async (appointmentId: string, soap: SoapDraft) => {
    try {
      setLoading(true);
      setError(null);
      return await mockApi.approveSoap(appointmentId, soap);
    } catch {
      setError("Unable to approve SOAP note.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, approve, loading, error };
}
