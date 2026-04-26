"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Doctor } from "@/lib/mock_api";

declare global {
  interface Window {
    google?: {
      maps?: {
        Map: new (element: HTMLElement, options: { center: { lat: number; lng: number }; zoom: number }) => unknown;
        Marker: new (options: { map: unknown; position: { lat: number; lng: number }; title: string }) => unknown;
      };
    };
  }
}

export default function DoctorMap({ doctors }: { doctors: Doctor[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const apiKey = useMemo(() => process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "", []);

  useEffect(() => {
    if (!mapRef.current || !apiKey || doctors.length === 0) return;
    let active = true;
    const mapElement = mapRef.current;
    const center = { lat: doctors[0].lat, lng: doctors[0].lng };

    const initializeMap = () => {
      const maps = window.google?.maps;
      if (!active || !maps) return;
      const map = new maps.Map(mapElement, { center, zoom: 11 });
      doctors.forEach((doctor) => {
        new maps.Marker({
          map,
          position: { lat: doctor.lat, lng: doctor.lng },
          title: `${doctor.name} (${doctor.specialty})`,
        });
      });
      setMapReady(true);
    };

    if (window.google?.maps) {
      initializeMap();
      return () => {
        active = false;
      };
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      active = false;
    };
  }, [apiKey, doctors]);

  return (
    <div className="rounded-2xl border p-4">
      <h3 className="mb-2 font-semibold">Doctor Map</h3>
      {apiKey ? (
        <>
          <div className="h-72 w-full overflow-hidden rounded-xl border" ref={mapRef} />
          {!mapReady && <p className="mt-2 text-sm text-gray-600">Loading map...</p>}
        </>
      ) : (
        <>
          <p className="text-sm text-amber-700">Add `NEXT_PUBLIC_GOOGLE_MAPS_KEY` to enable interactive map markers.</p>
          <div className="mt-2 grid gap-2 text-sm text-gray-700">
            {doctors.map((doctor) => (
              <p key={doctor.id}>
                📍 {doctor.name} - {doctor.specialty} ({doctor.lat}, {doctor.lng})
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
