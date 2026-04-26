type WorkflowStatus =
  | "coding_review_required"
  | "prescription_blocked_missing_provider_credentials"
  | "ready_for_export";

export default function WorkflowStatusBadge({
  status,
  active,
}: {
  status: WorkflowStatus;
  active: boolean;
}) {
  const activeStyles =
    status === "ready_for_export"
      ? "bg-green-100 text-green-800 border-green-300"
      : status === "coding_review_required"
        ? "bg-amber-100 text-amber-900 border-amber-300"
        : "bg-rose-100 text-rose-900 border-rose-300";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        active ? activeStyles : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      {status}
    </span>
  );
}
