"use client";

import { useState } from "react";

export default function SOAPEditor() {
  const [soap, setSoap] = useState({
    s: "",
    o: "",
    a: "",
    p: "",
  });

  const update = (key, value) => {
    setSoap((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {["s", "o", "a", "p"].map((key) => (
        <textarea
          key={key}
          placeholder={key.toUpperCase()}
          className="w-full border p-2"
          value={soap[key]}
          onChange={(e) => update(key, e.target.value)}
        />
      ))}
    </div>
  );
}