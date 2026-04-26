"use client";

import { useState } from "react";
import { SOAP_FIELDS } from "@/lib/ui_constants";

type SoapField = "s" | "o" | "a" | "p";
type SoapState = Record<SoapField, string>;

export default function SOAPEditor() {
  const [soap, setSoap] = useState<SoapState>({ s: "", o: "", a: "", p: "" });
  const update = (key: SoapField, value: string) => setSoap((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      {SOAP_FIELDS.map((key) => (
        <textarea key={key} placeholder={key.toUpperCase()} className="w-full border p-2" value={soap[key]} onChange={(e) => update(key, e.target.value)} />
      ))}
    </div>
  );
}
