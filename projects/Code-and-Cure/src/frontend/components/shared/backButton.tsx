"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallbackPath = "/" }: { fallbackPath?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackPath);
  };

  return (
    <button
      className="rounded-lg border bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      onClick={handleBack}
      type="button"
    >
      ← Back
    </button>
  );
}
