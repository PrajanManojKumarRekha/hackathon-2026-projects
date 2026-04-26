export default function SOAPApproveButton({
  loading,
  onApprove,
}: {
  loading: boolean;
  onApprove: () => void;
}) {
  return (
    <button className="rounded bg-green-600 px-4 py-2 text-white" onClick={onApprove}>
      {loading ? "Processing..." : "Approve"}
    </button>
  );
}
