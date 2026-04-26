"use client";

import { useMemo } from "react";
import { mockApi } from "./mock_api";

export function useDoctors(specialty?: string) {
  const doctors = useMemo(() => {
    const data = mockApi.getDoctorsSync();
    return specialty ? data.filter((d) => d.specialty === specialty) : data;
  }, [specialty]);

  return { doctors, loading: false, error: null as string | null };
}