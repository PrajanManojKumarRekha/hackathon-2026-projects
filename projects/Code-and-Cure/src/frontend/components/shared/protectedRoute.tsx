"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "@/lib/useAuth";
import LoadingSpinner from "./loadingSpinner";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role: "patient" | "doctor";
}) {
  const { user, ready } = useAuth();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted || !ready) return;
    if (!user || user.role !== role) window.location.href = "/";
  }, [mounted, ready, role, user]);

  if (!mounted || !ready) return <LoadingSpinner label="Checking access..." />;
  if (!user || user.role !== role) return null;
  return <>{children}</>;
}
