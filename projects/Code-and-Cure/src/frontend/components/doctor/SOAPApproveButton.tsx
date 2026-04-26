export default function SOAPApproveButton({
  loading,
  onApprove,
  label = "Approve",
  disabled = false,
}: {
  loading: boolean;
  onApprove: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className="rounded bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={disabled || loading}
      onClick={onApprove}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
