"use client";

import { useEffect, useState } from "react";
import { mockApi, Doctor } from "./mock_api";

export function useDoctors(specialty?: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getDoctors().then((data) => {
      if (specialty) {
        setDoctors(data.filter((d) => d.specialty === specialty));
      } else {
        setDoctors(data);
      }
      setLoading(false);
    });
  }, [specialty]);

  return { doctors, loading };
}